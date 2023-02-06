package comment

import (
	"kanban/api"
	"kanban/pkg/ctx"
	"kanban/pkg/e"
	"kanban/pkg/log"
)

func (s *CommentService) Add(c *ctx.Context, req *api.Comment) (res *api.Comment, err error) {
	res = new(api.Comment)

	comment := apiToModel(req)
	s.dao.Add(comment)
	res.Id = comment.ID
	res.UpdatedAt = comment.UpdatedAt

	return
}
func (s *CommentService) Update(c *ctx.Context, req *api.Comment) (res *api.Comment, err error) {
	res = new(api.Comment)
	comment := s.dao.GetById(req.Id)
	if comment.UserId != c.GetUserID() {
		err = e.Forbidden
		return
	}
	nc := apiToModel(req)
	s.dao.Update(nc)
	log.L.Debugf("after update nc %s \n", nc.UpdatedAt.String())
	res.UpdatedAt = nc.UpdatedAt
	return
}

func (s *CommentService) Delete(c *ctx.Context, req *api.Comment) error {
	comment := s.dao.GetById(req.Id)
	if comment.UserId != c.GetUserID() {
		return e.Forbidden
	}
	s.dao.Delete(apiToModel(req))
	return nil
}

func (s *CommentService) ListAll(c *ctx.Context, req *api.Comment) (res *api.ListRes[*api.Comment]) {
	res = new(api.ListRes[*api.Comment])
	res.Items = append(res.Items, s.dao.ListAll(req.TaskId)...)
	return
}
