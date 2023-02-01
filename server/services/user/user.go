package user

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/pkg/encrypt"
)

type UserService struct {
	dao *dao.UserDao
}

func NewUserService() *UserService {
	return &UserService{dao.NewUserDao()}
}

func (s *UserService) Login(c *ctx.Context, req *api.User) (resp *api.User, err error) {
	resp = new(api.User)

	u, err := s.dao.GetUserByPhone(req.Phone)

	if u.ID <= 0 {
		err = e.UserNotExists
		return
	}

	if !encrypt.Compare(u.Password, req.Password) {
		err = e.InvalidPassword
		return
	}

	resp.Id = u.ID
	resp.Name = u.Name
	resp.Level = u.Level
	resp.Phone = u.Phone
	resp.AvatarColor = u.AvatarColor

	return
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

func (s *UserService) UpdateUser(c *ctx.Context, req *api.User) (resp *api.User, err error) {
	resp = new(api.User)
	u := &models.User{
		Name:   req.Name,
		Phone:  req.Phone,
		Status: req.Status,
		Level:  req.Level,
	}
	u.ID = req.Id
	err = s.dao.UpdateUser(u)
	return
}

func (s *UserService) ResetPassword(c *ctx.Context, req *api.User) {
	u := new(models.User)
	u.ID = req.Id
	u.Password = ""
	s.dao.UpdateUser(u)

}
