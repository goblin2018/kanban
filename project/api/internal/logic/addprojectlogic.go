package logic

import (
	"context"

	"kanban/project/api/internal/svc"
	"kanban/project/api/internal/types"

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
	// todo: add your logic here and delete this line

	return
}
