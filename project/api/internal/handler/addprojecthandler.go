package handler

import (
	"net/http"

	"github.com/zeromicro/go-zero/rest/httpx"
	"kanban/project/api/internal/logic"
	"kanban/project/api/internal/svc"
	"kanban/project/api/internal/types"
)

func addProjectHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.AddProjectReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.Error(w, err)
			return
		}

		l := logic.NewAddProjectLogic(r.Context(), svcCtx)
		resp, err := l.AddProject(&req)
		if err != nil {
			httpx.Error(w, err)
		} else {
			httpx.OkJson(w, resp)
		}
	}
}
