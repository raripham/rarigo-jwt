package models

type CfRole struct {
	ID       uint   `gorm:"primarykey; column:id"`
	Email    string `json:"email" gorm:"column:email"`
	CfDomain string `json:"cf_domain" gorm:"column:cf_domain"`
	CfRef    CF     `gorm:"foreignKey:CfDomain;references:Domain"`
}
