package controllers

import (
	"net/http"
	"rarigo-jwt/initializers"
	"rarigo-jwt/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// func GetCdns(c *gin.Context) {
// 	// user, _ := c.Get("user")
// 	// email := user.(models.User).Email
// 	user := models.User{
// 		Email: c.DefaultQuery("email", ""),
// 		Role:  c.DefaultQuery("role", ""),
// 	}
// 	var cdns []models.Cdn
// 	// var roles []models.CdnRole
// 	// initializers.DB.Find(&roles, "email = ?", email)
// 	// initializers.DB.Preload("cdn_roles").Where("email = ?", email).Find(&role)
// 	// initializers.DB.Preload("cdn_roles").Find(&cdns)
// 	if user.Role == "Admin" {
// 		initializers.DB.Table("cdns").Find(&cdns)
// 	} else {
// 		// initializers.DB.Joins("cdns", initializers.DB.Where(&models.CdnRole{Email: email})).Find(&cdns)
// 		// initializers.DB.Joins("cdns", initializers.DB.Where(&roles, "email = ?", email)).Find(&cdns)
// 		// err := initializers.DB.Model(&models.CdnRole{Email: email}).Joins("JOIN cdns ON cdn_roles.cdn_resourceid = cdns.cdn_resourceid").Scan(&cdns).Error
// 		// if err != nil {
// 		// 	log.Fatal(err)
// 		// }
// 		initializers.DB.Table("cdn_roles").
// 			Select("cdns.*").
// 			Joins("left JOIN cdns ON cdn_roles.cdn_resourceid = cdns.cdn_resourceid").
// 			Where("cdn_roles.email = ?", user.Email).
// 			Scan(&cdns)
// 	}

// 	c.JSON(http.StatusOK, cdns)
// }

func GetCdnByUser(c *gin.Context) {

	user := models.User{
		Email: c.DefaultQuery("email", ""),
		// Role:  c.DefaultQuery("role", ""),
	}
	var cdns []models.Cdn

	initializers.DB.Model(&models.CdnRole{}).Where("cdn_roles.email = ?", user.Email).Joins("left join cdns on cdns.cf_domain = cf_roles.cf_domain").Scan(&cdns)

	c.JSON(http.StatusOK, cdns)
}

func GetAllCdns(c *gin.Context) {
	var cdns []models.Cdn

	result := initializers.DB.Find(&cdns)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get all CDNs",
		})
		return
	}

	c.JSON(http.StatusOK, cdns)
}

func CreateCdn(c *gin.Context) {
	var cdn models.Cdn

	// Read info from body
	if c.Bind(&cdn) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read cdn body",
		})
		return
	}

	// Hash the Token
	token, err := bcrypt.GenerateFromPassword([]byte(cdn.Token), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	// Create cdn
	cdn.Token = string(token)
	result := initializers.DB.Create(&cdn)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create CDN",
		})
		return
	}

	// resp
	c.JSON(http.StatusOK, gin.H{})

}

func DeleteCdn(c *gin.Context) {

}

func GetCdnRole(c *gin.Context) {
	var cdnroles []models.CdnRole

	result := initializers.DB.Find(&cdnroles)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get CDN Role",
		})
		return
	}
	c.JSON(http.StatusOK, cdnroles)
}

func CreateCdnRole(c *gin.Context) {
	var cdnrole models.CdnRole
	// Get from body
	if c.Bind(&cdnrole) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body CDN Role",
		})
		return
	}
	// Create role
	result := initializers.DB.Create(&cdnrole)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create CDN Role",
		})
		return
	}
	// resp
	c.JSON(http.StatusOK, gin.H{})
}
