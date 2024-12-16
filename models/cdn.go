package models

type Cdn struct {
	CdnID      uint   `json:"cdn_id" gorm:"primarykey; column:cdn_id"`
	ResourceID int16  `json:"cdn_resourceid" gorm:"unique; column:cdn_resourceid"`
	Name       string `json:"cdn_name" gorm:"column:cdn_name"`
	Domain     string `json:"cdn_domain" gorm:"column:cdn_domain"`
	User       string `json:"cdn_user" gorm:"column:cdn_user"`
	Token      string `json:"cdn_token" gorm:"column:cdn_token"`
}
