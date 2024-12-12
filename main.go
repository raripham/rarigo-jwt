package main

import (
	"rarigo-jwt/initializers"
	"rarigo-jwt/routes"
)

func init() {
	initializers.DB()
}

func main() {
	r := routes.Config()
	r.Run(":8000")
}
