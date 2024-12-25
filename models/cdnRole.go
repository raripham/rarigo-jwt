package models

type CdnRole struct {
	ID      uint   `gorm:"primarykey; column:id"`
	Email   string `json:"email" gorm:"column:email"`
	CdnName string `json:"cdn_name" gorm:"unique; column:cdn_name"`
	// ResourceID int16  `json:"cdn_resourceid" gorm:"column:cdn_resourceid"`
	// UserRef       User   `gorm:"foreignKey:Email;references:Email"`
	// CdnRef Cdn `gorm:"foreignKey:CdnName,ResourceID;references:Name,ResourceID"`
	CdnRef Cdn `gorm:"foreignKey:CdnName;references:Name"`
}
