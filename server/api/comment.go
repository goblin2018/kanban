package api

import "time"

type Comment struct {
	Id        uint      `json:"id" form:"id"`
	Info      string    `json:"info" form:"info"`
	UpdatedAt time.Time `json:"updatedAt" form:"updatedAt"`
	UserId    uint      `json:"userId" form:"userId"`
	User      *User     `json:"user" form:"user"`
	TaskId    uint      `json:"taskId" form:"taskId"`
}
