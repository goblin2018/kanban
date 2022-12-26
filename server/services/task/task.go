package task

import (
	"kanban/dao"
)

type TaskService struct {
	dao *dao.TaskDao
}

func NewTaskService() *TaskService {
	return &TaskService{dao.NewTaskDao()}
}
