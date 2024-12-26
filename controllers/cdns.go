package controllers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"rarigo-jwt/initializers"
	"rarigo-jwt/middlewares"
	"rarigo-jwt/models"
	"time"

	gormjsonb "github.com/dariubs/gorm-jsonb"
	"github.com/gin-gonic/gin"
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

	initializers.DB.Model(&models.CdnRole{}).Where("cdn_roles.email = ?", user.Email).Joins("left join cdns on cdns.cdn_name = cdn_roles.cdn_name").Scan(&cdns)

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

	// Encrypt the Token
	token, err := middlewares.Encrypt(cdn.Token, initializers.PublicKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to encrypt token",
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

func PurgeCacheCDN(c *gin.Context) {
	var cdnbody struct {
		models.CdnRole
		Role string
		models.PurgeRequest
	}
	// read body
	if c.Bind(&cdnbody) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body PurgeCache CDN",
		})
		return
	}

	// check user permission
	if cdnbody.Role != "Admin" {
		resultRole := initializers.DB.Find(&models.CdnRole{}, "email = ? AND cf_domain = ?", cdnbody.Email, cdnbody.CdnName)
		if resultRole.Error != nil || resultRole.RowsAffected == 0 {
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "no permission for purge this domain",
			})
			return
		}
	}

	// get cdn info
	var cdn models.Cdn
	resultCdn := initializers.DB.First(&cdn, "cdn_name = ?", cdnbody.CdnName)
	if resultCdn.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to get info CF",
		})
		return
	}

	// Decrypt token
	token, err := middlewares.Decrypt(cdn.Token, initializers.PrivateKey)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to decrypt token CDN",
		})
		return
	}

	// purge cache
	var purgeBodyReq models.PurgeRequest
	var purgeURL url.URL
	if cdnbody.PurgePath == "all" {
		purgeURL = url.URL{
			Scheme: "https",
			Host:   cdn.Domain,
			Path:   "cdn_resources/" + string(cdn.ResourceID) + "/purge_all.json",
		}

	} else {
		purgeURL = url.URL{
			Scheme: "https",
			Host:   cdn.Domain,
			Path:   "cdn_resources/" + string(cdn.ResourceID) + "/purge",
		}

	}
	purgeBodyReq.PurgePath = cdnbody.PurgePath
	jsonBody, err := json.Marshal(purgeBodyReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to marshal struct purgebody CDN",
		})
		return
	}

	purgeReq, err := http.NewRequest(
		http.MethodPost,
		purgeURL.String(),
		bytes.NewBuffer(jsonBody),
	)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create purge cache CDN Request",
		})
		return
	}
	purgeReq.Header.Set("Content-Type", "application/json")
	purgeReq.Header.Set("Accept", "application/json")
	purgeReq.SetBasicAuth(cdn.User, token)
	client := http.Client{
		Timeout: 30 * time.Second,
	}
	purgeResp, err := client.Do(purgeReq)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to making purge cache CDN Request",
		})
		return
	}
	defer purgeResp.Body.Close()

	purgeBody, err := ioutil.ReadAll(purgeResp.Body)
	if err != nil {
		log.Println("Error reading purge CDN response body:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error reading purge CDN response body",
		})
		return
	}

	var notice gormjsonb.JSONB

	err = json.Unmarshal(purgeBody, &notice)
	if err != nil {
		log.Println("Error reading purge CDN response body:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error reading purge CDN response body",
		})
		return
	}

	c.JSON(http.StatusOK, notice)
}
