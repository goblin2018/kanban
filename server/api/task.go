package api

import "gopkg.in/guregu/null.v4"

type TaskGroup struct {
	Id        uint    `json:"id" form:"id"`
	ProjectId uint    `json:"projectId" form:"projectId"`
	Name      string  `json:"name" form:"name"`
	Serial    int     `json:"serial" form:"serial"`
	Tasks     []*Task `json:"tasks" form:"tasks"`
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
