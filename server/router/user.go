package router

import "kanban/pkg/ctx"

type UserController struct {
}

func (co UserController) RegisterRouters(en *ctx.RouterGroup) {
	u := en.Group("/user")
	u.POST("/login", co.login)
}

func (co UserController) login(c *ctx.Context) {

}
