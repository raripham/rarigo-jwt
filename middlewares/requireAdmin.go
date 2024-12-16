package middlewares

import (
	"net/http"
	"rarigo-jwt/models"

	"github.com/gin-gonic/gin"
)

func RequireAdmin(c *gin.Context) {
	user, _ := c.Get("user")
	role := user.(models.User).Role
	if role == "Admin" {
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
}
