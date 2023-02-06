package ctx

import (
	"kanban/api"

	"github.com/gin-gonic/gin"
)

// Custon Context data and funcs
type Context struct {
	*gin.Context
}

func (c *Context) SetUserID(id uint) {
	c.Set("user_id", id)

}

func (c *Context) GetUserID() uint {
	return c.GetUint("user_id")
}

func (c *Context) SetPhone(phone string) {
	c.Set("phone", phone)
}

func (c *Context) GetPhone() string {
	return c.GetString("phone")

}

func (c *Context) SetUserLevel(level int) {
	c.Set("level", level)
}

func (c *Context) GetUserLevel() int {
	return c.GetInt("level")
}

func (c *Context) IsAdmin() bool {
	return c.GetInt("level") == api.UserLevelAdmin
}
