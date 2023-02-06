package comment

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
)

type CommentService struct {
	dao *dao.CommentDao
}

func NewCommentService() *CommentService {
	return &CommentService{dao.NewCommentDao()}
}

func apiToModel(a *api.Comment) *models.Comment {
	m := new(models.Comment)
	m.ID = a.Id
	m.Info = a.Info
	m.TaskId = a.TaskId
	m.UserId = a.UserId
	return m
}
