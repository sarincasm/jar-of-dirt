package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"
	"strconv"
	"sync"
)

type Ingredient struct {
	Title string `db:"title" json:"title"`
	Image string `db:"image" json:"image"`
	Type  string `db:"type" json:"type"`
}
type RecipeDetail struct {
	Id    int    `db:"id" json:"id"`
	Title string `db:"title" json:"title"`
	Body  string `db:"body" json:"body,omitempty"`
	Url   string `db:"url" json:"url"`
}
type GenericSqlResponse []map[string]interface{}

func aggregateQuery(query string, args ...any) int {
	var count int
	err := db.Get(&count, query, args...)
	if err != nil {
		fmt.Println(err)
		return 0
	}
	return count
}

func queryPostgresForIngredients(query string, args ...any) []Ingredient {
	ingredients := []Ingredient{}

	rows, err := db.Query(query, args...)

	// print type of rows
	fmt.Println(reflect.TypeOf(rows))

	if err != nil {
		fmt.Println(err)
		return ingredients
	}

	// iterate through rows
	for rows.Next() {
		// unmarshal row into ingredient struct
		var ingredient Ingredient
		err = rows.Scan(&ingredient.Title, &ingredient.Image, &ingredient.Type)

		if err != nil {
			fmt.Println(err)
			return ingredients
		}

		// append ingredient to ingredients
		ingredients = append(ingredients, ingredient)
	}

	// return ingredients
	return ingredients
}

func queryPostgresForRecipe(query string, args ...any) GenericSqlResponse {
	// declare recipes array
	recipes := []map[string]interface{}{}

	rows, err := db.Queryx(query, args...)

	if err != nil {
		fmt.Println(err)
		return recipes
	}

	// iterate through rows
	for rows.Next() {
		recipe := make(map[string]interface{})
		err = rows.MapScan(recipe)

		if err != nil {
			fmt.Println(err)
			return recipes
		}

		// append recipe to recipes
		recipes = append(recipes, recipe)
	}

	// return recipes
	return recipes
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	limit := 10

	// get term from query string
	term := r.URL.Query().Get("term")
	term = "%" + term + "%"

	// get page from query string and convert to int
	page := r.URL.Query().Get("page")
	page_int, err := strconv.Atoi(page)
	page_int = (page_int - 1) * limit

	if err != nil {
		fmt.Println(err)
	}

	// sql parameterized query to search ingredients by title or type
	select_clause := "SELECT title, image, type FROM ingredients"
	where_clause := " WHERE CONCAT(title, type) ILIKE $1"
	limit_clause := " LIMIT $2 OFFSET $3"
	query := select_clause + where_clause + limit_clause

	count_clause := "SELECT COUNT(*) FROM ingredients"
	count_query := count_clause + where_clause + limit_clause

	// or use a window function
	// SELECT id, title, COUNT(*) OVER ()::INT AS total_count FROM ingredients;

	// declare ingredients slice
	ingredients := []Ingredient{}
	// declare count int
	count := 0

	// Create a WaitGroup to wait for both goroutines to complete
	var wg sync.WaitGroup
	wg.Add(2)

	// Launch goroutines to execute the queries concurrently
	go func() {
		defer wg.Done()
		fmt.Println("Launching query for ingredients")
		ingredients = queryPostgresForIngredients(query, term, limit, page_int)
		fmt.Println("Finished query for ingredients", ingredients)
	}()
	go func() {
		defer wg.Done()
		fmt.Println("Launching query for count")
		count = aggregateQuery(count_query, term, limit, page_int)
		fmt.Println("Finished query for count")
	}()

	fmt.Println("Waiting for goroutines to complete")
	wg.Wait()
	fmt.Println("Goroutines complete")

	fmt.Println("ingredients:", ingredients)
	fmt.Println("count:", count)

	// marshal ingredients into json
	ingredients_json, err := json.Marshal(ingredients)

	if err != nil {
		fmt.Println(err)
	}

	// print type of ingredients_json and ingredients
	fmt.Printf("%T	", ingredients_json)
	fmt.Printf("%T	", ingredients)

	type Result struct {
		Ingredients []Ingredient `json:"ingredients"`
		Total_Count int          `json:"total_count"`
	}

	result := Result{
		Total_Count: count,
		Ingredients: ingredients,
	}

	result.Total_Count = count
	result.Ingredients = ingredients

	final_result, err := json.Marshal(result)

	if err != nil {
		fmt.Println(err)
	}

	// write json to response
	w.Header().Set("Content-Type", "application/json")
	w.Write(final_result)
}

func searchByTypeHandler(w http.ResponseWriter, r *http.Request) {
	// get query string
	user_query := r.URL.Query().Get("type")

	// sql parameterized query to get ingredients of type
	query := "SELECT title, image, type FROM ingredients WHERE type = $1"

	// query postgres
	ingredients := queryPostgresForIngredients(query, user_query)

	// marshal ingredients into json
	result, err := json.Marshal(ingredients)

	if err != nil {
		fmt.Println(err)
	}

	// write json to response
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)

	// data := make(map[string]string)
	// data["dirtyKey"] = "dirty"
	// data["dirtyKey2"] = "dirty"
	// json.NewEncoder(w).Encode(json)
}

func searchRecipesHandler(w http.ResponseWriter, r *http.Request) {
	// query to get recipe id, title and photo
	query := `
    SELECT DISTINCT ON (r.recipe_id)
      r.recipe_id as id,
			r.title,
			COALESCE(rp.url, 'default.jpg') AS url
    FROM
      recipes r
    LEFT JOIN
      recipes_photos rp
    ON
      r.recipe_id = rp.recipe_id;
  `

	recipes := queryPostgresForRecipe(query)

	// marshal recipes into json
	result, err := json.Marshal(recipes)

	if err != nil {
		fmt.Println(err)
	}

	// write json to response
	w.Header().Set("Content-Type", "application/json")
	w.Write(result)
}

func getRecipeHandler(w http.ResponseWriter, r *http.Request) {
	// get recipe id from query string
	recipe_id := r.URL.Query().Get("id")

	// sql parameterized query to get ingredients by recipe id
	queryIngredients := `
    SELECT
      i.title AS title,
      i.image AS image,
      i.type AS type
    FROM
      recipe_ingredients ri
    INNER JOIN
      ingredients i
    ON
      i.id = ri.ingredient_id
    WHERE
      ri.recipe_id = $1;
  `

	// sql parameterized query to get recipe details by recipe id
	queryRecipeDetails := `
		SELECT 
      r.recipe_id as id,
			r.title,
			r.body,
			COALESCE(rp.url, 'default.jpg') AS url
    FROM 
      recipes r
    LEFT JOIN
      recipes_photos rp
    ON
      rp.recipe_id = r.recipe_id
    WHERE 
      r.recipe_id = $1;
	`

	// declare ingredients slice
	ingredients := []Ingredient{}
	// declare recipe details slice
	recipe_details_response := GenericSqlResponse{}

	// Create a WaitGroup to wait for both goroutines to complete
	var wg sync.WaitGroup
	wg.Add(2)

	// Launch goroutines to execute the queries concurrently
	go func() {
		defer wg.Done()
		fmt.Println("Launching query for ingredients")
		ingredients = queryPostgresForIngredients(queryIngredients, recipe_id)
		fmt.Println("Finished query for ingredients", ingredients)
	}()
	go func() {
		defer wg.Done()
		fmt.Println("Launching query for recipe details")
		recipe_details_response = queryPostgresForRecipe(queryRecipeDetails, recipe_id)
		fmt.Println("Finished query for recipe details", recipe_details_response)
	}()

	fmt.Println("Waiting for goroutines to complete")
	wg.Wait()
	fmt.Println("Goroutines complete")

	// marshal ingredients into json
	// result, err := json.Marshal(ingredients)

	if err != nil {
		fmt.Println(err)
	}

	// print result
	fmt.Println(ingredients)
	fmt.Println(recipe_details_response)

	// Convert the generic response to a slice of RecipeDetail structs
	var recipe_details []RecipeDetail
	for _, item := range recipe_details_response {
		recipe := RecipeDetail{
			Id:    int(item["id"].(int64)),
			Title: item["title"].(string),
			Body:  item["body"].(string),
			Url:   item["url"].(string),
		}
		recipe_details = append(recipe_details, recipe)
	}

	// get photos from recipe
	var photos []string
	for _, recipePhotoRow := range recipe_details {
		photos = append(photos, recipePhotoRow.Url)
	}

	type Result struct {
		Title       string       `json:"title"`
		Body        string       `json:"body"`
		Photos      []string     `json:"photos"`
		Ingredients []Ingredient `json:"ingredients"`
	}

	result := Result{
		Title:       recipe_details[0].Title,
		Body:        recipe_details[0].Body,
		Photos:      photos,
		Ingredients: ingredients,
	}
	response, err := json.Marshal(result)

	if err != nil {
		fmt.Println(err)
	}

	// write result to response
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}
