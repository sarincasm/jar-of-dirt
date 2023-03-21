package main

import (
	"fmt"
	"reflect"
)

func insert_stuff() {
	// print to debug
	fmt.Println("insert_stuff")
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

func select_stuff() {
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
