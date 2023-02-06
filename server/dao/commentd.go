package dao

import (
	"kanban/api"
	"kanban/models"
	"kanban/pkg/mysql"

	"gorm.io/gorm"
)

type CommentDao struct {
	*gorm.DB
}

func NewCommentDao() *CommentDao {
	return &CommentDao{mysql.GetDB()}
}

func (d *CommentDao) Add(c *models.Comment) error {
	return d.Create(c).Error
}

func (d *CommentDao) Update(c *models.Comment) {
	d.Model(c).Where("id = ?", c.ID).Omit("user_id", "task_id").Updates(c)
}

func (d *CommentDao) GetById(id uint) (c *models.Comment) {
	c = new(models.Comment)
	d.Model(&models.Comment{}).Where("id = ?", id).First(&c)
	return
}

func (d *CommentDao) Delete(c *models.Comment) {
	d.Model(&models.Comment{}).Where("id = ?", c.ID).Delete(&models.Comment{})
}

func (d *CommentDao) ListAll(taskId uint) (comments []*api.Comment) {
	d.Model(&models.Comment{}).Preload("User").Where("task_id = ?", taskId).Find(&comments)
	return
}
