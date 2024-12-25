package controllers

import (
	"log"
	"net/http"
	"rarigo-jwt/initializers"
	"rarigo-jwt/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func GetCfByUser(c *gin.Context) {

	user := models.User{
		Email: c.DefaultQuery("email", ""),
		// Role:  c.DefaultQuery("role", ""),
	}
	var cfs []models.CF

	initializers.DB.Model(&models.CfRole{}).Where("cf_roles.email = ?", user.Email).Joins("left join cfs on cfs.cf_domain = cf_roles.cf_domain").Scan(&cfs)

	c.JSON(http.StatusOK, cfs)
}

func GetAllCf(c *gin.Context) {
	var cfs []models.CF
	log.Println(initializers.DB.Find(&cfs).Error)

	c.JSON(http.StatusOK, cfs)
}

func CreateCF(c *gin.Context) {
	var cf models.CF

	// get CF info from body of req
	if c.Bind(&cf) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// Hash the Token
	token, err := bcrypt.GenerateFromPassword([]byte(cf.Token), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	// create CF
	cf.Token = string(token)
	result := initializers.DB.Create(&cf)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create cf",
		})
		return
	}

	// resp
	c.JSON(http.StatusOK, gin.H{})
}

func UpdateCF() {

}

func DeleteCF() {

}

func GetCFRole(c *gin.Context) {
	var cfRoles []models.CfRole

	result := initializers.DB.Find(&cfRoles)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Fail to get CF Role",
		})
		return
	}

	c.JSON(http.StatusOK, cfRoles)
}

func CreateCFRole(c *gin.Context) {
	var cfRole models.CfRole

	// get
	if c.Bind(&cfRole) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	// Create role
	result := initializers.DB.Create(&cfRole)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create role",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{})
}
