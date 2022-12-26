package project

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/ctx"
)

type ProjectService struct {
	dao *dao.ProjectDao
}

func NewProjectService() *ProjectService {
	return &ProjectService{dao.NewProjectDao()}
}

func (s *ProjectService) AddProject(c *ctx.Context, req *api.Project) (res *api.Project, err error) {
	res = new(api.Project)
	err = s.dao.AddProject(&models.Project{
		Name:    req.Name,
		Desc:    req.Desc,
		StartAt: req.StartAt,
		EndAt:   req.EndAt,
	})

	return
}

func (s *ProjectService) DelProject(c *ctx.Context, req *api.Project) (err error) {
	s.dao.DelProject(req.Id)
	return nil
}
