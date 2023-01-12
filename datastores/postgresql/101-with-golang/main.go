package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Ingredient struct {
	Title string `db:"title"`
	Image string `db:"image"`
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

func searchHandler(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]string)
	data["dirtyKey"] = "dirty"
	data["dirtyKey2"] = "dirty"
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func main() {
	fmt.Println("Starting")

	db, err := sqlx.Connect("postgres", "dbname=dirty user=postgres password=lol sslmode=disable")

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

	http.HandleFunc("/recipes/search", searchHandler)

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/", fs)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
