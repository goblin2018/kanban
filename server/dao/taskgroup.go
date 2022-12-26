package dao

import (
	"kanban/models"
	"kanban/pkg/mysql"

	"gorm.io/gorm"
)

type TaskGroupDao struct {
	*gorm.DB
}

func NewTaskGroupDao() *TaskGroupDao {
	return &TaskGroupDao{mysql.GetDB()}
}

func (d *TaskGroupDao) AddTaskGroup(t *models.TaskGroup) error {
	return d.Create(t).Error
}

func (d *TaskGroupDao) DelTaskGroup(id uint) {
	d.Unscoped().Model(&models.Task{}).Where("task_group_id = ?", id).Delete(&models.Task{})
	d.Unscoped().Model(&models.TaskGroup{}).Where("id = ?", id).Delete(&models.TaskGroup{})
}

func (d *TaskGroupDao) UpdateTaskGroup(t *models.TaskGroup) error {
	return d.Model(&models.TaskGroup{}).Where("id = ?", t.ID).Updates(t).Error
}
