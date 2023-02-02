package middlewares

import (
	"kanban/api"
	"kanban/pkg/conf"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/pkg/jwt"
	"time"

	uuid "github.com/satori/go.uuid"
)

const (
	Token = "token"
)

func JWT() ctx.HandlerFunc {
	return func(c *ctx.Context) {

		token := c.Request.Header.Get(Token)
		if token == "" {
			c.Abort(e.TokenError.Add("token is empty"))
			return
		}

		claims, err := jwt.ParseToken(token)
		if err != nil {
			c.Abort(e.TokenError.Add(err.Error()))
			return
		}

		if time.Unix(claims.ExpiresAt, 0).Add(conf.C.Token.Expiration).Before(time.Now()) {
			c.Abort(e.TokenError.Add("token expired"))
			return
		}
		// ok set user id  and phone
		c.SetPhone(claims.Phone)
		c.SetUserID(claims.Id)
		c.SetUserLevel(claims.Level)

		if claims.ExpiresAt < time.Now().Unix() {
			LoadToken(c, &api.User{Id: claims.Id, Phone: claims.Phone, Level: claims.Level})
		}

		c.Set("request_id", uuid.NewV4().String())

		c.Next()

	}
}

func LoadToken(c *ctx.Context, user *api.User) {
	c.Header(Token, jwt.GenToken(user, conf.C.Token.Expiration))
}
