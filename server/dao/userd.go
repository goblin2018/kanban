package dao

import (
	"kanban/models"
	"kanban/pkg/mysql"

	"gorm.io/gorm"
)

type UserDao struct {
	*gorm.DB
}

func NewUserDao() *UserDao {
	return &UserDao{mysql.GetDB()}
}

func (d *UserDao) AddUser(u *models.User) error {
	return d.Create(u).Error
}
