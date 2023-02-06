package models

import (
	"kanban/api"

	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Name    string `gorm:"type:varchar(100);comment:项目名称"`
	Desc    string
	StartAt null.Time
	EndAt   null.Time
	OwnerId uint `gorm:"comment:项目拥有者"`
	Owner   *User
	Status  int `gorm:"comment:1.未开始，2.进行中，3.已完成"`
	Tasks   []*Task
}

func (p *Project) BeforeCreate(tx *gorm.DB) (err error) {
	if p.Status == 0 {
		p.Status = api.StatusNotStart
	}
	return
}
