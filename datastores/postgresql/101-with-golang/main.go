package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

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

func main() {
	fmt.Println("Starting Main")

	db, err = sqlx.Connect("postgres", "dbname=dirty user=postgres password=lol sslmode=disable")

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	if false {
		insert_stuff()
	}
	if false {
		select_stuff()
	}
	if false {
		inner_join()
	}
	if false {
		select_json()
	}
	if false {
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
