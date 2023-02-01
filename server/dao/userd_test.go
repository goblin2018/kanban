package dao

import (
	"kanban/api"
	"kanban/models"
	"kanban/pkg/encrypt"
	"kanban/pkg/mysql"
	"testing"
)

func TestAddUser(t *testing.T) {
	mysql.Init()
	d := NewUserDao()
	d.AddUser(&models.User{
		Name:     "张银磊",
		Duty:     "测试一下",
		Phone:    "13560792125",
		Password: encrypt.Encrypt(api.DefaultPassword),
		Level:    100,
	})

}
