package main

import "fmt"
import "reflect"
import "strconv"

var name string

var name2, name3 string

var (
	name4 string
	count int
)

var name5 = "name"

var countStr = "4"

func main() {
	fmt.Println(name, name2, name3, name4, count)
	fmt.Println(reflect.TypeOf(name))
	fmt.Println(name5, reflect.TypeOf(name5))

	countI, err := strconv.Atoi(countStr)

	if err == nil {
		fmt.Println(countI)
	}

	fmt.Println(&name4, &name5)
	
	var ptr *string = &name5
	fmt.Println(ptr, *ptr)

	ptr2 := &name5
	fmt.Println(ptr2, *ptr2)

	const c = "will not change"
	fmt.Println(c)
}
