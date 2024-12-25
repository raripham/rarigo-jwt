package initializers

import "rarigo-jwt/models"

// sync table DB
func SyncDB() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Cdn{})
	DB.AutoMigrate(&models.CdnRole{})
	DB.AutoMigrate(&models.CF{})
	DB.AutoMigrate(&models.CfRole{})
}
