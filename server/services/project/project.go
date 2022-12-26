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

func (s *ProjectService) ListProjects(c *ctx.Context) (ps []*api.Project) {
	ps = s.dao.ListAllProjects()
	return
}

func (s *ProjectService) GetProjectDetail(c *ctx.Context, req *api.Project) (resp *api.Project, err error) {
	resp, err = s.dao.GetProjectDetail(req.Id)
	return
}
