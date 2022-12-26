package dao

import (
	"kanban/models"
	"kanban/pkg/mysql"

	"gorm.io/gorm"
)

type TaskDao struct {
	*gorm.DB
}

func NewTaskDao() *TaskDao {
	return &TaskDao{mysql.GetDB()}
}

func (d *TaskDao) AddTask(t *models.Task) error {
	return d.Create(t).Error
}

func (d *TaskDao) DelTask(id uint) {
	d.Unscoped().Model(&models.Task{}).Where("id = ?", id).Delete(&models.Task{})
}

func (d *TaskDao) UpdateTask(t *models.Task) error {
	return d.Model(&models.Task{}).Where("id = ?", t.ID).Omit("id, deleted_at").Updates(t).Error
}

func (d *TaskDao) GetTaskById(id uint) (t *models.Task, err error) {
	t = new(models.Task)
	err = d.Model(&models.Task{}).Where("id = ?", id).First(t).Error
	return
}
