package router

import (
	"fmt"
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/services/project"
)

type ProjectController struct {
	s *project.ProjectService
}

func NewProjectController() *ProjectController {
	return &ProjectController{
		s: project.NewProjectService(),
	}
}

func (co *ProjectController) RegisterRouters(en *ctx.RouterGroup) {
	p := en.Group("/project")
	p.POST("", co.addProject)
	p.DELETE("", co.delProject)
}

func (co *ProjectController) addProject(c *ctx.Context) {
	req := new(api.Project)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	res, err := co.s.AddProject(c, req)
	c.JSON(res, err)
}

func (co *ProjectController) delProject(c *ctx.Context) {
	req := new(api.Project)
	if err := c.ShouldBind(req); err != nil {
		c.Fail(e.InvalidParams.Add(err.Error()))
		return
	}

	if req.Id <= 0 {
		c.Fail(e.InvalidParams.Add(fmt.Sprintf("invalid project id %d", req.Id)))
		return
	}
	err := co.s.DelProject(c, req)

	c.JSON(nil, err)

}
