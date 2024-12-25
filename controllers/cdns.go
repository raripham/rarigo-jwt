package controllers

import (
	"net/http"
	"rarigo-jwt/initializers"
	"rarigo-jwt/models"

	"github.com/gin-gonic/gin"
)

func GetCdns(c *gin.Context) {
	// user, _ := c.Get("user")
	// email := user.(models.User).Email
	user := models.User{
		Email: c.DefaultQuery("email", ""),
		Role:  c.DefaultQuery("role", ""),
	}
	var cdns []models.Cdn
	// var roles []models.CdnRole
	// initializers.DB.Find(&roles, "email = ?", email)
	// initializers.DB.Preload("cdn_roles").Where("email = ?", email).Find(&role)
	// initializers.DB.Preload("cdn_roles").Find(&cdns)
	if user.Role == "Admin" {
		initializers.DB.Table("cdns").Find(&cdns)
	} else {
		// initializers.DB.Joins("cdns", initializers.DB.Where(&models.CdnRole{Email: email})).Find(&cdns)
		// initializers.DB.Joins("cdns", initializers.DB.Where(&roles, "email = ?", email)).Find(&cdns)
		// err := initializers.DB.Model(&models.CdnRole{Email: email}).Joins("JOIN cdns ON cdn_roles.cdn_resourceid = cdns.cdn_resourceid").Scan(&cdns).Error
		// if err != nil {
		// 	log.Fatal(err)
		// }
		initializers.DB.Table("cdn_roles").
			Select("cdns.*").
			Joins("left JOIN cdns ON cdn_roles.cdn_resourceid = cdns.cdn_resourceid").
			Where("cdn_roles.email = ?", user.Email).
			Scan(&cdns)
	}

	c.JSON(http.StatusOK, cdns)
}
