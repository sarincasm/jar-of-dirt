package main

import (
	"fmt"
	"os"
)

func main() {
	name := os.Getenv("USER")
	course := "Learn everything"

	fmt.Println("Hi", name, "your current course is", course)
	updateCourse(&course)

	fmt.Println("You’re currently watching", course)
}

func updateCourse(coursePointer *string) string {
	*coursePointer = "Learning nothing"
	fmt.Println("Updated course to", *coursePointer)
	return *coursePointer
}
