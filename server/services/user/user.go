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
	resp.Duty = u.Duty

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

func (s *UserService) Update(c *ctx.Context, req *api.User) (resp *api.User, err error) {
	resp = new(api.User)
	u := &models.User{
		Name:        req.Name,
		Phone:       req.Phone,
		Status:      req.Status,
		Level:       req.Level,
		AvatarColor: req.AvatarColor,
	}
	u.ID = req.Id
	err = s.dao.UpdateUser(u)
	return
}

func (s *UserService) UpdatePassword(c *ctx.Context, req *api.UpdatePasswordReq) (err error) {

	u := new(models.User)
	u.ID = req.Id
	if req.Action == api.Reset {
		u.Password = encrypt.Encrypt(api.DefaultPassword)
	} else {
		ou, err := s.dao.GetUserById(req.Id)
		if ou.ID <= 0 || err != nil {
			return e.UserNotExists
		}

		if !encrypt.Compare(ou.Password, req.Op) {
			return e.InvalidPassword
		}
		u.Password = encrypt.Encrypt(req.Np)
	}

	s.dao.UpdateUser(u)
	return
}

func (s *UserService) ListUsers(c *ctx.Context, req *api.ListOpt) (resp *api.ListRes[*api.User], err error) {
	resp = new(api.ListRes[*api.User])
	users, total, err := s.dao.ListUsers(req)
	resp.Items = users
	resp.Total = total
	return
}
