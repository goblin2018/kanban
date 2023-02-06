package router

import (
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/router/middlewares"
	"kanban/services/user"
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

	u.Use(middlewares.JWT())
	{
		u.PUT("", co.update)
		u.GET("", co.list)
		u.POST("", co.add)
		u.DELETE("", co.delete)
		u.PUT("/password", co.password)
	}
}

func (co UserController) login(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Login(c, req)
	if err == nil {
		middlewares.LoadToken(c, res)
	}

	c.JSON(res, err)
}

func (co *UserController) update(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	if req.Id == 0 {
		req.Id = c.GetUserID()
	} else {
		if req.Id != c.GetUserID() && !c.IsAdmin() {
			c.Fail(e.Forbidden)
			return
		}
	}

	res, err := co.s.Update(c, req)
	c.JSON(res, err)
}

func (co *UserController) password(c *ctx.Context) {
	req := new(api.UpdatePasswordReq)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	if req.Id == 0 {
		req.Id = c.GetUserID()
	} else {
		if req.Id != c.GetUserID() && !c.IsAdmin() {
			c.Fail(e.Forbidden)
			return
		}
	}

	err := co.s.UpdatePassword(c, req)
	c.JSON(nil, err)
}

func (co *UserController) list(c *ctx.Context) {
	req := new(api.ListOpt)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}
	if !c.IsAdmin() {
		c.Fail(e.Forbidden)
		return
	}
	res, err := co.s.ListUsers(c, req)
	c.JSON(res, err)
}

func (co *UserController) add(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}
	if !c.IsAdmin() {
		c.Fail(e.Forbidden)
		return
	}
	res, err := co.s.AddUser(c, req)
	c.JSON(res, err)
}

func (co *UserController) delete(c *ctx.Context) {
	req := new(api.User)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}
	err := co.s.Delete(c, req)
	c.JSON(nil, err)
}
