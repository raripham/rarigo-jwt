package initializers

import "rarigo-jwt/models"

func SyncDB() {
	DB.AutoMigrate(&models.User{})
}
