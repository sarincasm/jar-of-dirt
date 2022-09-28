package main

import (
	"fmt"
)

func main() {
	leagueTitles := make(map[string]int)
	leagueTitles["Sunderland"] = 6
	leagueTitles["Newcastle"] = 4

	recentHead2HeadWins := map[string]int{
		"Sunderland": 6,
		"Newcastle":  0,
	}

	fmt.Printf("League titles: %v\nRecent Head to heads: %v\n",
		leagueTitles, recentHead2HeadWins)

	testMap := map[string]int{
		"A": 1,
		"B": 2,
		"C": 3,
		"D": 4,
		"E": 5,
		"F": 6,
		"G": 7,
		"H": 8,
		"I": 9,
	}

	for key, value := range testMap {
		fmt.Println(key, value)
	}

	testMap["A"] = 100
	testMap["J"] = 1973
	fmt.Println(testMap)

	delete(testMap, "J")
	fmt.Println(testMap)
}
