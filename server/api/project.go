package api

import (
	"gopkg.in/guregu/null.v4"
)

const (
	StatusNotStart = 1
	StatusOn       = 2
	StatusDone     = 3
)

type Project struct {
	Id         uint         `json:"id" form:"id"`
	Name       string       `json:"name" form:"name"`
	StartAt    null.Time    `json:"startAt" form:"startAt"`
	EndAt      null.Time    `json:"endAt" form:"endAt"`
	Desc       string       `json:"desc" form:"desc"`
	Status     int          `json:"status" form:"status"`
	TaskGroups []*TaskGroup `json:"taskGroups" form:"taskGroups"`
	Owner      *User        `json:"owner" form:"owner"`
	OwnerId    uint         `json:"ownerId" form:"ownerId"`
	Color      string       `json:"color" form:"color"`
}

type ListProjectReq struct {
	ListOpt
	My bool `json:"my" form:"my"`
}
