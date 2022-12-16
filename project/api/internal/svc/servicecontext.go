package svc

import (
	"kanban/project/api/internal/config"
	"kanban/project/model"

	"github.com/zeromicro/go-zero/core/stores/sqlx"
)

type ServiceContext struct {
	Config       config.Config
	ProjectModel model.ProjectModel
}

func NewServiceContext(c config.Config) *ServiceContext {
	sqlConn := sqlx.NewMysql(c.DB.DataSource)
	return &ServiceContext{
		Config:       c,
		ProjectModel: model.NewProjectModel(sqlConn, c.Cache),
	}
}
