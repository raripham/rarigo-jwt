package routes

import (
	"net/http"
	"rarigo-jwt/controllers"
	"rarigo-jwt/middlewares"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func Config() *gin.Engine {
	r := gin.Default()

	// CORS config
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	backend := r.Group("api")
	{
		backend.GET("/health", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, "health")
		})
		backend.POST("/signup", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.Signup)
		backend.POST("/login", controllers.Login)
		backend.GET("/validate", middlewares.RequireAuth, controllers.Validate)
		backend.GET("/cdns", middlewares.RequireAuth, controllers.GetCdns)
	}

	return r
}
