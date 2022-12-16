package logic

import (
	"context"
	"database/sql"
	"time"

	"kanban/project/api/internal/svc"
	"kanban/project/api/internal/types"
	"kanban/project/model"

	"github.com/zeromicro/go-zero/core/logx"
)

type AddProjectLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewAddProjectLogic(ctx context.Context, svcCtx *svc.ServiceContext) *AddProjectLogic {
	return &AddProjectLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *AddProjectLogic) AddProject(req *types.AddProjectReq) (resp *types.AddProjectResp, err error) {
	_, err = l.svcCtx.ProjectModel.Insert(l.ctx, &model.Project{
		StartAt: sql.NullTime{Time: time.Unix(req.StartAt, 0)},
		EndAt:   sql.NullTime{Time: time.Unix(req.EndAt, 0)},
		Desc:    sql.NullString{String: req.Desc},
		Name:    req.Name,
	})

	if err != nil {
		return nil, err
	}

	return &types.AddProjectResp{
		Project: types.Project{
			Name:    "",
			Desc:    "",
			StartAt: 0,
			EndAt:   0,
		},
	}, nil
}
