package main

import (
	"fmt"
)

func main() {

	type courseMeta struct {
		author string
		level  string
		name string
		rating float64
	}

	myCourse := courseMeta{
		author: "Eels",
		level:  "Intermediate",
		name: "My Course Name",
		rating: 5,
	}

	fmt.Println(myCourse.name, myCourse.author)
	myCourse.rating = 1.2
	fmt.Println("Course rating is currently", myCourse.rating)
}
