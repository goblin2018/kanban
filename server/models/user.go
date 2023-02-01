package models

import (
	"kanban/api"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name        string `gorm:"type:varchar(20);index:name;comment:姓名"`
	Phone       string `gorm:"type:char(11);uniqueIndex:phone;comment:电话号码"`
	Duty        string `gorm:"type:varchar(32);comment:职位"`
	Status      int    `gorm:"default 1;comment:1.启用 2.禁用"`
	Password    string `gorm:"type:varchar(100);comment:密码"`
	Level       int    `gorm:"default 1;comment:用户类型:1.普通用户 100.管理员"`
	AvatarColor string `gorm:"type:varchar(10);comment:头像颜色"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.Status == 0 {
		u.Status = api.UserStatusOk
	}
	if u.Level == 0 {
		u.Level = api.UserLevelNormal
	}
	return
}
