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

	http.HandleFunc("/ingredients/type", searchByTypeHandler)
	http.HandleFunc("/ingredients/search", searchHandler)

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
