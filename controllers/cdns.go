package controllers

import (
	"net/http"
	"rarigo-jwt/initializers"
	"rarigo-jwt/models"

	"github.com/gin-gonic/gin"
)

func GetCdns(c *gin.Context) {
	user, _ := c.Get("user")
	email := user.(models.User).Email
	var cdns []models.Cdn
	var roles []models.CdnRole
	// initializers.DB.Find(&roles, "email = ?", email)
	// initializers.DB.Preload("cdn_roles").Where("email = ?", email).Find(&role)
	// initializers.DB.Preload("cdn_roles").Find(&cdns)
	if user.(models.User).Role == "Admin" {
		initializers.DB.Joins("cdns", "roles").Find(&cdns)
	} else {
		initializers.DB.Joins("cdns", initializers.DB.Where(&roles, "email = ?", email)).Find(&cdns)
	}

	c.JSON(http.StatusOK, gin.H{
		"cdns": cdns,
		"role": roles,
	})
}
