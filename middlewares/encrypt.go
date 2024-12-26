package middlewares

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"io"
	"log"

	"github.com/Northern-Lights/going/file"
)

func LoadPrivate(PRIV_KEY string) (*rsa.PrivateKey, error) {
	// Read the bytes of the PEM file, e.g. id_rsa
	// pemData, e := file.Read(filepath)
	// if e != nil {
	// 	return nil, e
	// }

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

func LoadPublic(filepath string) (*rsa.PublicKey, error) {
	pemData, e := file.Read(filepath)
	if e != nil {
		return nil, e
	}
	pemBlock, _ := pem.Decode(pemData)
	publicTmp, e := x509.ParsePKIXPublicKey(pemBlock.Bytes)

	public, ok := publicTmp.(*rsa.PublicKey)
	if !ok {
		panic("Unable to parse RSA public key, generating a temp one")
	}
	return public, e
}

func Decrypt(dataBasecode string, privateKey *rsa.PrivateKey) (string, error) {

	// case PRIV_KEY string
	// privateKey := strings.ReplaceAll(PRIV_KEY, "\\n", "\n")
	// priv, e := LoadPrivate(privateKey)
	// if e != nil {
	// 	return "", e
	// }

	ciphertext, e := base64.StdEncoding.DecodeString(dataBasecode)
	if e != nil {
		return "", e
	}

	plaintext, e := rsa.DecryptPKCS1v15(rand.Reader, privateKey, []byte(ciphertext))

	return string(plaintext), e
}

func Encrypt(data string, publicKey *rsa.PublicKey) (string, error) {
	// pub, err := LoadPublic("keys/cf-api-publickey.pem")
	// if err != nil {
	// 	panic(err)
	// }

	// plaintext := base64.StdEncoding.EncodeToString([]byte(data))

	ciphertext, err := rsa.EncryptPKCS1v15(rand.Reader, publicKey, []byte(data))
	if err != nil {
		return "", err
	}

	return string(base64.StdEncoding.EncodeToString([]byte(ciphertext))), err
}

func EncryptPass(plaintext, passphrase string) (chipertext string, err error) {
	block, _ := aes.NewCipher([]byte(passphrase))
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err = io.ReadFull(rand.Reader, nonce); err != nil {
		return
	}
	ciphertextByte := gcm.Seal(
		nonce,
		nonce,
		[]byte(plaintext),
		nil)
	chipertext = base64.StdEncoding.EncodeToString(ciphertextByte)
	return
}

func DecryptPass(cipherText, key string) (plainText string, err error) {
	// prepare cipher
	keyByte := []byte(key)
	block, err := aes.NewCipher(keyByte)
	if err != nil {
		return
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return
	}
	nonceSize := gcm.NonceSize()
	//
	// process ciphertext
	ciphertextByte, _ := base64.StdEncoding.DecodeString(cipherText)
	nonce, ciphertextByteClean := ciphertextByte[:nonceSize], ciphertextByte[nonceSize:]
	plaintextByte, err := gcm.Open(
		nil,
		nonce,
		ciphertextByteClean,
		nil)
	if err != nil {
		log.Println(err)
		return
	}
	plainText = string(plaintextByte)
	//
	return
}

// func Test() {
// 	PRIV_KEY := strings.ReplaceAll(os.Getenv("PRIV_KEY"), "\\n", "\n")
// 	priv, err := LoadPrivate(PRIV_KEY)
// 	if err != nil {
// 		log.Println(err)
// 	}
// 	data := "asdlfhasdkljfhasd43985743"
// 	publicKey := &priv.PublicKey

// 	dataEncrypt := Encrypt(data, publicKey)
// 	log.Println("data Encrypt: ", data, dataEncrypt)

// 	dataDecrypt, err := Decrypt(dataEncrypt, os.Getenv("PRIV_KEY"))
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	log.Println("data Decrypt: ", dataDecrypt)
// }
