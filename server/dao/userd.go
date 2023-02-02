package dao

import (
	"kanban/api"
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

func (d *UserDao) DelUser(id uint) {
	d.Model(&models.User{}).Where("id = ?", id).Delete(&models.User{})
}

func (d *UserDao) UpdateUser(u *models.User) error {
	return d.Model(&models.User{}).Where("id = ?", u.ID).Omit("id, created_at").Updates(u).Error
}

func (d *UserDao) GetUserByPhone(phone string) (user *models.User, err error) {
	user = new(models.User)
	err = d.Model(&models.User{}).Where("phone = ?", phone).First(user).Error
	return
}

func (d *UserDao) GetUserById(id uint) (user *models.User, err error) {
	user = new(models.User)
	err = d.Model(&models.User{}).Where("id = ?", id).First(user).Error
	return
}

func (d *UserDao) ListUsers(opt *api.ListOpt) (users []*api.User, total int64, err error) {

	err = d.Model(&models.User{}).Count(&total).Order("updated_at DESC").Offset(opt.Offset).Limit(opt.Limit).Find(&users).Error
	return
}
