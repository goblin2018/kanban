package api

import "gopkg.in/guregu/null.v4"

type TaskGroup struct {
	Id        uint    `json:"id" form:"id"`
	ProjectId uint    `json:"projectId" form:"projectId"`
	Name      string  `json:"name" form:"name"`
	Serial    int     `json:"serial" form:"serial"`
	Tasks     []*Task `json:"tasks" form:"tasks"`
}

type MoveTaskGroupResp struct {
	Serial     int   `json:"serial" form:"serial"`
	UpdateAll  bool  `json:"updateAll" form:"updateAll"`
	AllSerials []int `json:"allSerials" form:"allSerials"`
}

type MoveTaskGroupReq struct {
	ProjectId uint `json:"projectId" form:"projectId"`
	Id        uint `json:"id" form:"id"`     // 要移动的id
	Prev      uint `json:"prev" form:"prev"` // 移动之后前面的id
	Next      uint `json:"next" form:"next"` // 移动之后后面的id
}

type Task struct {
	Id          uint      `json:"id" form:"id"`
	Name        string    `json:"name" form:"name"`
	Status      int       `json:"status" form:"status"`
	Owner       uint      `json:"owner" form:"owner"`
	PStartAt    null.Time `json:"pStartAt" form:"pStartAt"`
	PEndAt      null.Time `json:"pEndAt" form:"pEndAt"`
	StartAt     null.Time `json:"startAt" form:"startAt"`
	EndAt       null.Time `json:"endAt" form:"endAt"`
	ProjectId   uint      `json:"projectId" form:"projectId"`
	TaskGroupId uint      `json:"taskGroupId" form:"taskGroupId"`
	Serial      int       `json:"serial" form:"serial"`
}
