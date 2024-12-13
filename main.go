package main

import (
	"rarigo-jwt/initializers"
	"rarigo-jwt/routes"
)

func init() {
	initializers.LoadEnvVariable()
	initializers.ConnectDB()
	initializers.SyncDB()
}

func main() {
	r := routes.Config()
	r.Run(":8000")
}
