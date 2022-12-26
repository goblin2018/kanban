package dao

import (
	"kanban/models"
	"kanban/pkg/mysql"

	"gorm.io/gorm"
)

type ProjectDao struct {
	*gorm.DB
}

func NewProjectDao() *ProjectDao {
	return &ProjectDao{mysql.GetDB()}
}

func (d *ProjectDao) AddProject(p *models.Project) error {
	return d.Create(p).Error
}

func (d *ProjectDao) DelProject(id int64) {
	d.Where("id = ?", id).Delete(&models.Project{})
}
