package main

import (
	"kanban/models"
	"kanban/pkg/conf"
	"kanban/pkg/log"
	"kanban/pkg/mysql"
)

func main() {
	conf.Init()
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
}
