package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"reflect"
	"strconv"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// global variable for db connection and error
var db *sqlx.DB
var err error

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

func insert_stuff(db *sqlx.DB) {
	tx := db.MustBegin()
	tx.MustExec(`
		INSERT INTO ingredients (
			title, image, type
		) VALUES
			('red pepper', 'red_pepper.jpg', 'vegetable'),
			( 'avocado', 'avocado.jpg', 'fruit' ),
			( 'banana', 'banana.jpg', 'fruit' ),
			( 'beef', 'beef.jpg', 'meat' ),
			( 'black_pepper', 'black_pepper.jpg', 'other' ),
			( 'blueberry', 'blueberry.jpg', 'fruit' ),
			( 'broccoli', 'broccoli.jpg', 'vegetable' ),
			( 'carrot', 'carrot.jpg', 'vegetable' ),
			( 'cauliflower', 'cauliflower.jpg', 'vegetable' ),
			( 'cherry', 'cherry.jpg', 'fruit' ),
			( 'chicken', 'chicken.jpg', 'meat' ),
			( 'corn', 'corn.jpg', 'vegetable' ),
			( 'cucumber', 'cucumber.jpg', 'vegetable' ),
			( 'eggplant', 'eggplant.jpg', 'vegetable' ),
			( 'fish', 'fish.jpg', 'meat' ),
			( 'flour', 'flour.jpg', 'other' ),
			( 'ginger', 'ginger.jpg', 'other' ),
			( 'green_bean', 'green_bean.jpg', 'vegetable' ),
			( 'onion', 'onion.jpg', 'vegetable' ),
			( 'orange', 'orange.jpg', 'fruit' ),
			( 'pineapple', 'pineapple.jpg', 'fruit' ),
			( 'potato', 'potato.jpg', 'vegetable' ),
			( 'pumpkin', 'pumpkin.jpg', 'vegetable' ),
			( 'raspberry', 'raspberry.jpg', 'fruit' ),
			( 'red_pepper', 'red_pepper.jpg', 'vegetable' ),
			( 'salt', 'salt.jpg', 'other' ),
			( 'spinach', 'spinach.jpg', 'vegetable' ),
			( 'strawberry', 'strawberry.jpg', 'fruit' ),
			( 'sugar', 'sugar.jpg', 'other' ),
			( 'tomato', 'tomato.jpg', 'vegetable' ),
			( 'watermelon', 'watermelon.jpg', 'fruit' )
		ON CONFLICT DO NOTHING;
	`)
	tx.Commit()
}

func select_stuff(db *sqlx.DB) {
	ingredients := []Ingredient{}
	query := "SELECT title, image FROM ingredients"

	err := db.Select(&ingredients, query)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(ingredients)

	ingredients2 := []Ingredient{}
	user_query := "%fruit"
	// parameterized
	query2 := query + " WHERE CONCAT(title, type) ILIKE $1"
	fmt.Println(query2)

	rows, err := db.Query(query2, user_query)
	if err != nil {
		fmt.Println(err)
		return
	}
	for rows.Next() {
		var title string
		var image string
		rows.Scan(&title, &image)
		ingredient := Ingredient{
			Title: title,
			Image: image,
		}
		ingredients2 = append(ingredients2, ingredient)
	}

	fmt.Println(ingredients2)
}

func select_json() {
	// list of queries
	queries := []string{
		// select tags
		"SELECT meta -> 'tags' FROM recipes WHERE meta IS NOT NULL;",
		// select first tag
		"SELECT meta -> 'tags' -> 0 FROM recipes WHERE meta IS NOT NULL;",
		// parse as string
		"SELECT meta -> 'tags' ->> 0 FROM recipes WHERE meta IS NOT NULL;",
		// cake as available at that level
		"SELECT meta -> 'tags' FROM recipes WHERE meta -> 'tags' ? 'cake';",
		// array contains cake
		`SELECT meta -> 'tags' FROM recipes WHERE meta -> 'tags' @> '"cake"';`,
	}

	// iterate over queries
	for _, query := range queries {
		type Result []string
		result := Result{}
		// execute select query
		err := db.Select(&result, query)

		if err != nil {
			fmt.Println(err)
			return
		}

		// print type and length of result
		fmt.Println(reflect.TypeOf(result))
		fmt.Println(len(result))

		// print each element in result
		for _, element := range result {
			fmt.Println(element)
			// print type of element
			fmt.Println(reflect.TypeOf(element))
		}

		// print result
		fmt.Println(result)
	}
}

func run_aggregations() {
	// list of queries
	queries := []string{
		"SELECT COUNT(*) FROM ingredients;",
		"SELECT COUNT(DISTINCT type) FROM ingredients;",
		"SELECT DISTINCT type FROM ingredients;",
	}

	// iterate over queries
	for _, query := range queries {
		type Result []interface{}
		result := Result{}
		// execute select query
		err := db.Select(&result, query)

		if err != nil {
			fmt.Println("An error occured: ", err)
			return
		}

		// print type and length of result
		fmt.Println(reflect.TypeOf(result))
		fmt.Println(len(result))

		// print each element in result
		for _, element := range result {
			fmt.Println(element)
			// print type of element
			fmt.Println(reflect.TypeOf(element))
		}

		// print result
		fmt.Println(result)
	}

	// list of queries with 2 columns
	queries2 := []string{
		`
			SELECT type, COUNT(type)
			FROM ingredients
			GROUP BY type;
		`,
		`
			SELECT type, COUNT(type)
			FROM ingredients
			GROUP BY type
			HAVING COUNT(type) < 10;
		`,
		`
			SELECT type, COUNT(type)
			FROM ingredients
			WHERE id > 30
			GROUP BY type
			HAVING COUNT(type) < 10;
		`,
	}

	// iterate over queries2
	for _, query := range queries2 {
		type Result struct {
			Type  string `db:"type" json:"type"`
			Count int    `db:"count" json:"count"`
		}
		result := []Result{}

		// execute select query
		err := db.Select(&result, query)

		if err != nil {
			fmt.Println("An error occured: ", err)
			return
		}

		// print result
		fmt.Println(result)
	}
}

func aggregateQuery(query string, args ...any) int {
	var count int
	err := db.Get(&count, query, args...)
	if err != nil {
		fmt.Println(err)
		return 0
	}
	return count
}

func queryPostgres(query string, args ...any) []Ingredient {
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

func queryPostgresForRecipe(query string, args ...any) []RecipeDetail {
	recipes := []RecipeDetail{}

	rows, err := db.Query(query, args...)

	if err != nil {
		fmt.Println(err)
		return recipes
	}

	// iterate through rows
	for rows.Next() {
		// unmarshal row into recipe struct
		var recipe RecipeDetail
		err = rows.Scan(&recipe.Id, &recipe.Title, &recipe.Body, &recipe.Url)

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

	// query postgres
	ingredients := queryPostgres(query, term, limit, page_int)
	count := aggregateQuery(count_query, term, limit, page_int)

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
	ingredients := queryPostgres(query, user_query)

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
			'' as body,
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

	// query postgres
	ingredients := queryPostgres(queryIngredients, recipe_id)
	recipeDetails := queryPostgresForRecipe(queryRecipeDetails, recipe_id)

	// marshal ingredients into json
	// result, err := json.Marshal(ingredients)

	if err != nil {
		fmt.Println(err)
	}

	// print result
	fmt.Println(ingredients)
	fmt.Println(recipeDetails)

	// get photos from recipe
	var photos []string
	for _, recipePhotoRow := range recipeDetails {
		photos = append(photos, recipePhotoRow.Url)
	}

	type Result struct {
		Title       string       `json:"title"`
		Body        string       `json:"body"`
		Photos      []string     `json:"photos"`
		Ingredients []Ingredient `json:"ingredients"`
	}

	result := Result{
		Title:       recipeDetails[0].Title,
		Body:        recipeDetails[0].Body,
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

func inner_join() {
	// inner join query
	recipe_details := []RecipeDetail{}
	query := `
	SELECT r.title, r.body, rp.url
  FROM recipes_photos rp
  INNER JOIN
    recipes r
  ON
    rp.recipe_id = r.recipe_id
	`

	err := db.Select(&recipe_details, query)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(recipe_details)
}

func main() {
	fmt.Println("Starting Main")

	db, err = sqlx.Connect("postgres", "dbname=dirty user=postgres password=lol sslmode=disable")

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	if false {
		insert_stuff(db)
	}

	if false {
		select_stuff(db)
	}

	if false {
		inner_join()
	}

	if false {
		select_json()
	}

	if true {
		run_aggregations()
	}

	http.HandleFunc("/ingredients/type", searchByTypeHandler)
	http.HandleFunc("/ingredients/search", searchHandler)
	http.HandleFunc("/recipes/search", searchRecipesHandler)
	http.HandleFunc("/recipes/get", getRecipeHandler)

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
