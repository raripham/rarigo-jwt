package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Config() *gin.Engine {
	r := gin.Default()

	backend := r.Group("api")
	{
		backend.GET("/health", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, "health")
		})
	}

	return r
}
