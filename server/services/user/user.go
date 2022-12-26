package user

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/ctx"
)

type UserService struct {
	dao *dao.UserDao
}

func NewUserService() *UserService {
	return &UserService{dao.NewUserDao()}
}

func (s *UserService) AddUser(c *ctx.Context, req *api.User) (resp *api.User, err error) {
	resp = new(api.User)
	err = s.dao.AddUser(&models.User{
		Name:  req.Name,
		Phone: req.Phone,
		Duty:  req.Duty,
	})

	return
}
