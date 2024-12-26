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
		AllowOrigins:     []string{"http://localhost:8000", "http://localhost:5173", "http://localhost:3000"},
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
		backend.POST("/logout", controllers.Logout)
		backend.GET("/users", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.GetUser)
		backend.GET("/validate", middlewares.RequireAuth, controllers.Validate)
		// backend.GET("/cdns", middlewares.RequireAuth, controllers.GetCdns)

		backend.POST("/cfs", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.CreateCF)
		backend.GET("/getallcfs", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.GetAllCf)
		// GET /cdns?email=
		backend.GET("/cfs", middlewares.RequireAuth, controllers.GetCfByUser)

		backend.POST("/cfroles", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.CreateCFRole)
		backend.GET("/cfroles", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.GetCFRole)

		backend.POST("/cfs/purge", middlewares.RequireAuth, controllers.PurgeCacheCF)

		backend.POST("/cdns", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.CreateCdn)
		backend.GET("/cdns", middlewares.RequireAuth, controllers.GetCdnByUser)
		backend.GET("/getallcdns", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.GetAllCdns)

		backend.POST("/cdnroles", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.CreateCdnRole)
		backend.GET("/cdnroles", middlewares.RequireAuth, middlewares.RequireAdmin, controllers.GetCdnRole)

		backend.POST("/cdns/purge", middlewares.RequireAuth, controllers.PurgeCacheCDN)

	}

	return r
}
