package task

import (
	"kanban/api"
	"kanban/dao"
	"kanban/models"
	"kanban/pkg/ctx"
	"kanban/pkg/utils"
)

type TaskGroupService struct {
	dao *dao.TaskGroupDao
}

func NewTaskGroupService() *TaskGroupService {
	return &TaskGroupService{dao.NewTaskGroupDao()}
}

func (s *TaskGroupService) Add(c *ctx.Context, req *api.TaskGroup) (res *api.TaskGroup, err error) {
	res = new(api.TaskGroup)

	t := &models.TaskGroup{
		Name:      req.Name,
		ProjectId: req.ProjectId,
		Serial:    0,
		Color:     req.Color,
	}
	err = s.dao.AddTaskGroup(t)

	res.Id = t.ID
	res.Serial = t.Serial

	return
}

func (s *TaskGroupService) Move(c *ctx.Context, req *api.MoveTaskGroupReq) (res *api.MoveTaskGroupResp, err error) {
	res = new(api.MoveTaskGroupResp)

	var prev, next int
	if req.Prev > 0 {
		prev = s.dao.GetTaskGroupSerialById(req.Prev)
	} else {
		// 在前面插入
		res.Serial = s.dao.InsertToFirst(req.Id, req.ProjectId)
		return
	}
	if req.Next > 0 {
		next = s.dao.GetTaskGroupSerialById(req.Next)
	} else {
		res.Serial = s.dao.InsertToLast(req.Id, req.ProjectId)
		return
	}

	if (next - prev) >= 2 {
		serial := (prev + next) / 2
		s.dao.UpdateSerial(req.Id, serial)
		res.Serial = serial
		return
	}

	// 重排
	tgs := s.dao.GetSerialsByProjectId(req.ProjectId)

	idx := findIndex(tgs, req.Id)
	me := tgs[idx]
	// 删除
	tgs = utils.DeleteItem(tgs, idx)
	// 插入
	insertIdx := findIndex(tgs, req.Next)
	tgs = utils.InsertItem(tgs, insertIdx, me)

	for i, ntg := range tgs {
		ntg.Serial = i * dao.SerialGap
		s.dao.UpdateSerial(ntg.ID, ntg.Serial)
		res.AllSerials = append(res.AllSerials, ntg.Serial)
	}

	res.UpdateAll = true

	return
}

func findIndex(tgs []*models.TaskGroup, id uint) int {
	for idx, tg := range tgs {
		if tg.ID == id {
			return idx
		}
	}
	return -1
}

func (s *TaskGroupService) Update(c *ctx.Context, req *api.TaskGroup) (res *api.TaskGroup, err error) {
	res = new(api.TaskGroup)

	t := &models.TaskGroup{
		Name:  req.Name,
		Color: req.Color,
	}
	t.ID = req.Id
	err = s.dao.UpdateTaskGroup(t)
	return
}

func (s *TaskGroupService) List(c *ctx.Context, req *api.TaskGroup) (res *api.ListRes[*api.TaskGroup]) {
	res = new(api.ListRes[*api.TaskGroup])
	items := s.dao.List(req.ProjectId)
	res.Items = append(res.Items, items...)
	return
}
