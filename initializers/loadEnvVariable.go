package initializers

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

var PrivateKey *rsa.PrivateKey
var PublicKey *rsa.PublicKey

func LoadPrivate(PRIV_KEY string) (*rsa.PrivateKey, error) {

	// Use the PEM decoder and parse the private key
	pemBlock, _ := pem.Decode([]byte(PRIV_KEY))
	privTmp, e := x509.ParsePKCS8PrivateKey(pemBlock.Bytes)

	priv, ok := privTmp.(*rsa.PrivateKey)
	if !ok {
		panic("Unable to parse RSA private key, generating a temp one")
	}

	// Public key can be obtained through priv.PublicKey
	return priv, e
}

func LoadEnvVariable() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	keyString := strings.ReplaceAll(os.Getenv("PRIV_KEY"), "\\n", "\n")
	PrivateKey, err = LoadPrivate(keyString)
	if err != nil {
		log.Println(err)
	}
	PublicKey = &PrivateKey.PublicKey
}
