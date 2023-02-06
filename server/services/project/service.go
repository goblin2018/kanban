package project

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
)

type ProjectService struct {
	dao *dao.ProjectDao
}

func NewProjectService() *ProjectService {
	return &ProjectService{dao.NewProjectDao()}
}

func apiToModel(a *api.Project) *models.Project {

	m := &models.Project{
		Name:    a.Name,
		Desc:    a.Desc,
		StartAt: a.StartAt,
		EndAt:   a.EndAt,
		OwnerId: a.OwnerId,
		Status:  a.Status,
	}
	m.ID = a.Id
	return m
}
