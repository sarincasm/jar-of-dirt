package main

import (
	"fmt"
)

func main() {

    sliceWithMake := make([]string, 5, 10)

	fmt.Printf("Length of sliceWithMake is %d and capacity is %d\n",
		len(sliceWithMake), cap(sliceWithMake))

	courses := []string{"Docker & Kubernetes: The Big Picture",
		"Getting Started with Docker",
		"Getting Started with Kubernetes"}

	fmt.Printf("Length of courses slice is %d and capacity is %d\n",
		len(courses), cap(courses))

	for _, i := range courses {
		fmt.Println(i)
	}

	fmt.Println(courses[1:2])

	mySlice := make([]int, 1, 4)
	fmt.Printf("Length starts out as %d with a capacity of %d\n",
		len(mySlice), cap(mySlice))

	for i := 1; i < 17; i++ {
		mySlice = append(mySlice, i)
		fmt.Printf("Slice length is %d but capacity is %d\n",
			len(mySlice), cap(mySlice))
	}

	newSlice := []int{10, 20, 30}
	mySlice = append(mySlice, newSlice...)
	fmt.Printf("mySlice NOW contains %d and has a new length of %d and capacity of %d\n",
		mySlice, len(mySlice), cap(mySlice))
}