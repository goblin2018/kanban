package jwt

import (
	"kanban/api"
	"kanban/pkg/conf"
	"kanban/pkg/e"
	"time"

	"github.com/dgrijalva/jwt-go"
)

const issuer = "matrix-is-best"

type Claims struct {
	Id        uint   `json:"idd,omitempty"`
	Phone     string `json:"pho,omitempty"`
	Level     int    `json:"lev,omitempty"`
	ExpiresAt int64  `json:"exp,omitempty"`
	Issuer    string `json:"iss,omitempty"`
}

func (c Claims) Valid() error {
	if c.Id == 0 || c.Issuer != issuer {
		return e.TokenError
	}
	return nil
}

func GenToken(user *api.User, expiration time.Duration) string {
	c := Claims{
		Id:        user.Id,
		Phone:     user.Phone,
		Level:     user.Level,
		ExpiresAt: time.Now().Add(expiration).Unix(),
		Issuer:    issuer,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, c)
	tokenStr, _ := token.SignedString([]byte(conf.C.App.Key))
	return tokenStr

}

func ParseToken(token string) (*Claims, error) {
	t, err := jwt.ParseWithClaims(token, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(conf.C.App.Key), nil
	})

	if t == nil {
		return nil, err
	}

	if cliams, ok := t.Claims.(*Claims); ok && t.Valid {
		return cliams, nil
	}
	return nil, err
}
