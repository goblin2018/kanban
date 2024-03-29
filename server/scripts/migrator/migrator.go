package main

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/encrypt"
	"kanban/pkg/log"
	"kanban/pkg/mysql"
)

func main() {

	log.InitLogger()
	mysql.Init()
	db := mysql.GetDB()
	var err error

	err = db.AutoMigrate(&models.Project{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.Task{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.TaskGroup{})
	if err != nil {
		panic(err)
	}
	err = db.AutoMigrate(&models.User{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&models.Comment{})
	if err != nil {
		panic(err)
	}

	d := dao.NewUserDao()
	d.AddUser(&models.User{
		Name:     "张银磊",
		Duty:     "测试一下",
		Phone:    "13560792125",
		Password: encrypt.Encrypt(api.DefaultPassword),
		Level:    100,
	})
}
