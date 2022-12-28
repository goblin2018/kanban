package main

import (
	"kanban/pkg/conf"
	"kanban/pkg/log"
	"kanban/pkg/mysql"
	"kanban/pkg/redis"
	"kanban/router"
)

func main() {
	log.InitLogger()
	redis.Init()
	mysql.Init()

	app := router.InitRouter()

	ac := conf.C.App
	app.Run(ac.Host + ":" + ac.Port)

}
