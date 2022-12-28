package router

import "kanban/pkg/ctx"

func InitRouter() *ctx.Engine {

	app := ctx.Default()

	v1 := app.Group("/api/v1")
	NewProjectController().RegisterRouters(v1)
	NewTaskGroupController().RegisterRouters(v1)

	return app
}
