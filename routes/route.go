package routes

import (
	"net/http"
	"rarigo-jwt/controllers"
	"rarigo-jwt/middlewares"

	"github.com/gin-gonic/gin"
)

func Config() *gin.Engine {
	r := gin.Default()

	backend := r.Group("api")
	{
		backend.GET("/health", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, "health")
		})
		backend.POST("/signup", controllers.Signup)
		backend.POST("/login", controllers.Login)
		backend.GET("/validate", middlewares.RequireAuth, controllers.Validate)
	}

	return r
}
