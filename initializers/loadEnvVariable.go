package initializers

import "os"

func LoadEnvVariable() {
	DB_URL = os.Getenv("DB_URL")
}
