package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"rarigo-jwt/initializers"
	"rarigo-jwt/middlewares"
	"rarigo-jwt/models"
	"strings"
	"time"

	gormjsonb "github.com/dariubs/gorm-jsonb"
	"github.com/gin-gonic/gin"
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

	// Encrypt the Token
	token, err := middlewares.Encrypt(cf.Token, initializers.PublicKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to encrypt password",
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

func PurgeCacheCF(c *gin.Context) {
	var cfrole struct {
		models.CfRole
		Role string
	}

	// read body
	if c.Bind(&cfrole) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body PurgeCache CF",
		})
		return
	}
	// Check user permission
	if cfrole.Role != "Admin" {
		resultRole := initializers.DB.Find(&cfrole, "email = ? AND cf_domain = ?", cfrole.Email, cfrole.CfDomain)
		if resultRole.Error != nil || resultRole.RowsAffected == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "no permission for purge this domain",
			})
			return
		}
	}

	var cf models.CF
	// Get CF info
	resultCF := initializers.DB.First(&cf, "cf_domain = ?", cfrole.CfDomain)
	if resultCF.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get info CF",
		})
		return
	}

	// Decrypt token
	token, err := middlewares.Decrypt(cf.Token, initializers.PrivateKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to decrypt token CF",
		})
		return
	}

	// flush cache CF
	purgeURL := fmt.Sprintf("https://%s/client/v4/zones/%s/purge_cache", cf.Endpoint, cf.ZoneID)
	purgeReq, err := http.NewRequest(
		http.MethodPost,
		purgeURL,
		strings.NewReader(`{"purge_everything":true}`),
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create purge cache CF Request",
		})
		return
	}
	purgeReq.Header.Set("Content-Type", "application/json")
	purgeReq.Header.Set("Authorization", "Bearer "+token)

	client := http.Client{
		Timeout: 30 * time.Second,
	}
	purgeResp, err := client.Do(purgeReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to making purge cache CF Request",
		})
		return
	}
	defer purgeResp.Body.Close()

	purgeBody, err := ioutil.ReadAll(purgeResp.Body)
	if err != nil {
		log.Println("Error reading purge CF response body:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error reading purge CF response body",
		})
		return
	}

	var noti struct {
		Notice gormjsonb.JSONB `json:"is_noti"`
	}
	err = json.Unmarshal(purgeBody, &noti.Notice)
	if err != nil {
		log.Println("Error reading purge CF response body:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error reading purge CF response body",
		})
		return
	}

	c.JSON(http.StatusOK, noti.Notice)
}
