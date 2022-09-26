package main

import (
	"fmt"
	"os"
	"path"
	"runtime"
)

func main() {

	_, dirPath, _, _ := runtime.Caller(0)
	_, err0 := os.Open(path.Join(path.Dir(dirPath), "test.txt"))

	fmt.Println(err0)

	pwd, errWD := os.Getwd()
    if errWD != nil {
        fmt.Println(errWD)
        os.Exit(1)
    }
    fmt.Println(pwd)

	_, err := os.Open(pwd + "/test.txt")

	if err != nil {
		fmt.Println("This is the error:", err)
	} else {
		fmt.Println("This is the error:", err)
	}
}
