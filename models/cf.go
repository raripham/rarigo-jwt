package models

type CF struct {
	CfID     uint   `json:"cf_id" gorm:"primarykey; column:cf_id"`
	Domain   string `json:"cf_domain" gorm:"unique; column:cf_domain"`
	ZoneID   string `json:"cf_zoneid" gorm:"unique; column:cf_zoneid"`
	Endpoint string `json:"cf_endpoint" gorm:"column:cf_endpoint"`
	Token    string `json:"cf_token" gorm:"column:cf_token"`
}
