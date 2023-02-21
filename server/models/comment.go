package models

import (
	"kanban/pkg/log"

	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	UserId    uint
	User      *User
	Info      string
	TaskId    uint
	ProjectId uint
}

func (co *Comment) AfterUpdate(tx *gorm.DB) (err error) {
	log.L.Debugf("AfterUpdate comment %s \n", co.UpdatedAt.String())
	return
}
