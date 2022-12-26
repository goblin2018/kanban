package task

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/ctx"
)

type TaskGroupService struct {
	dao *dao.TaskGroupDao
}

func NewTaskGroupService() *TaskGroupService {
	return &TaskGroupService{dao.NewTaskGroupDao()}
}

func (s *TaskGroupService) AddTaskGroup(c *ctx.Context, req *api.TaskGroup) (res *api.TaskGroup, err error) {
	res = new(api.TaskGroup)
	err = s.dao.AddTaskGroup(&models.TaskGroup{
		Name:      req.Name,
		ProjectId: req.ProjectId,
		Serial:    0,
	})

	return
}
