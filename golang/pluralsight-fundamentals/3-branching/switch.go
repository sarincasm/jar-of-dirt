package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {

	switch "Istio" {
	case "kubernetes":
		fmt.Println("Case 1. kubernetes with lower-case \"k\".")
	case "Kubernetes":
		fmt.Println("Case 2. Kubernetes with a cpital \"K\".")
		fallthrough
	case "K8s":
		fmt.Println("Case 3. Kubernetes short name \"Kates\".")
	case "Istio":
		fmt.Println("Case 4. Service mesh is the future.")
		fallthrough
	default:
		fmt.Println("Hit the default")
	}

	switch tmpNum := random(); tmpNum {
	case 0, 2, 4, 6, 8:
		fmt.Println("We got the following even number -", tmpNum)
	case 1, 3, 5, 7, 9:
		fmt.Println("We got the following odd number -", tmpNum)
	}

}

func random() int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(10)
}