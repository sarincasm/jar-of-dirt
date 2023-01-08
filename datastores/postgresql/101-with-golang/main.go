package main

import (
	"fmt"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

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

func main() {
	fmt.Println("Starting")

	db, err := sqlx.Connect("postgres", "dbname=dirty user=postgres password=lol sslmode=disable")

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	insert_stuff(db)
}
