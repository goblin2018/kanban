package router

import (
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/pkg/jwt"
	"kanban/router/middlewares"
	"kanban/services/user"
	"time"
)

type UserController struct {
	s *user.UserService
}

func NewUserController() *UserController {
	return &UserController{user.NewUserService()}
}

func (co UserController) RegisterRouters(en *ctx.RouterGroup) {
	u := en.Group("/user")
	u.POST("/login", co.login)
}

func (co UserController) login(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Login(c, req)
	if err == nil {
		now := time.Now()
		claims := jwt.Claims{
			Id:        res.ID,
			Phone:     res.Phone,
			Level:     res.Level,
			ExpiresAt: now.Add(conf.Token.TokenExpiration).Unix(),
			Issuer:    conf.Token.Issuer,
		}

		c.Header(middlewares.Token, jwt.GenerateToken(claims))
		claims.ExpiresAt = now.Add(conf.Token.RefreshExpiration).Unix()
		c.Header(middlewares.RefreshToken, jwt.GenerateToken(claims))
	}

	c.JSON(res, err)

}

func (co *UserController) register(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	// res, err := c.
}
