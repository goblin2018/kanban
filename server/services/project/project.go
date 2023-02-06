package project

import (
	"kanban/api"
	"kanban/pkg/ctx"
)

func (s *ProjectService) AddProject(c *ctx.Context, req *api.Project) (res *api.Project, err error) {
	res = new(api.Project)
	err = s.dao.AddProject(apiToModel(req))
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

// func (s *ProjectService) GetProjectDetail(c *ctx.Context, req *api.Project) (resp *api.Project, err error) {
// 	resp, err = s.dao.GetProjectDetail(req.Id)
// 	return
// }

func (s *ProjectService) Update(c *ctx.Context, req *api.Project) (res *api.Project, err error) {
	res = new(api.Project)
	err = s.dao.UpdateProject(apiToModel(req))
	return
}
