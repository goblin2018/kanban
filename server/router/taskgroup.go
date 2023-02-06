package router

import (
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/router/middlewares"
	"kanban/services/task"
)

type TaskGroupController struct {
	s *task.TaskGroupService
}

func NewTaskGroupController() *TaskGroupController {
	return &TaskGroupController{s: task.NewTaskGroupService()}
}

func (co *TaskGroupController) RegisterRouters(en *ctx.RouterGroup) {
	tg := en.Group("/taskgroup")
	tg.Use(middlewares.JWT())
	{
		tg.POST("", co.add)
		tg.POST("/move", co.move)
		tg.PUT("", co.update)
		tg.GET("", co.list)
	}
}

func (co *TaskGroupController) add(c *ctx.Context) {
	req := new(api.TaskGroup)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Add(c, req)
	c.JSON(res, err)
}
func (co *TaskGroupController) move(c *ctx.Context) {
	req := new(api.MoveTaskGroupReq)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Move(c, req)
	c.JSON(res, err)
}

func (co *TaskGroupController) update(c *ctx.Context) {
	req := new(api.TaskGroup)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.Update(c, req)
	c.JSON(res, err)
}

func (co *TaskGroupController) list(c *ctx.Context) {
	req := new(api.TaskGroup)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res := co.s.List(c, req)
	c.JSON(res, nil)
}
