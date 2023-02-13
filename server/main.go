package main

import (
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

	app.Run(":80")

}
