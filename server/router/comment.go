package router

import (
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/router/middlewares"
	"kanban/services/comment"
)

type CommentController struct {
	s *comment.CommentService
}

func NewCommentController() *CommentController {
	return &CommentController{comment.NewCommentService()}
}

func (co *CommentController) RegisterRouters(en *ctx.RouterGroup) {
	t := en.Group("/task/comment")
	t.Use(middlewares.JWT())
	{
		t.POST("", co.add)
		t.PUT("", co.update)
		t.DELETE("", co.delete)
		t.GET("", co.listALl)
	}
}

func (co *CommentController) add(c *ctx.Context) {
	req := new(api.Comment)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}
	req.UserId = c.GetUserID()
	res, err := co.s.Add(c, req)
	c.JSON(res, err)
}

func (co *CommentController) update(c *ctx.Context) {
	req := new(api.Comment)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Update(c, req)
	c.JSON(res, err)
}

func (co *CommentController) delete(c *ctx.Context) {
	req := new(api.Comment)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	err := co.s.Delete(c, req)
	c.JSON(nil, err)
}

func (co *CommentController) listALl(c *ctx.Context) {
	req := new(api.Comment)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res := co.s.ListAll(c, req)
	c.JSON(res, nil)
}
