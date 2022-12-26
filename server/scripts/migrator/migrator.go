package main

import "kanban/pkg/mysql"

func main() {
	mysql.Init()
	db := mysql.GetDB()

	db.AutoMigrate()
}
