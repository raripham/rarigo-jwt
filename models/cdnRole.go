package models

type CdnRole struct {
	ID            uint   `gorm:"primarykey; column:id"`
	Email         string `json:"email" gorm:"column:email"`
	CdnResourceID int16  `json:"cdn_resourceid" gorm:"column:cdn_resourceid"`
	// UserRef       User   `gorm:"foreignKey:Email;references:Email"`
	CdnRef Cdn `gorm:"foreignKey:CdnResourceID;references:ResourceID"`
}
