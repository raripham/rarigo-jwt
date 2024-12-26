package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `json:"email" gorm:"unique; column:email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
