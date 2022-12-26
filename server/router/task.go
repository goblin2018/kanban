package router

import (
	"kanban/services/task"
)

type TaskController struct {
	s *task.TaskService
}
