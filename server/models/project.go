package models

import (
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Name    string
	Desc    string
	StartAt null.Time
	EndAt   null.Time
	Owner   int64
}
