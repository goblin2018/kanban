package api

const (
	DefaultPassword    = "senmeng66"
	UserLevelNormal    = 1
	UserLevelAdmin     = 100
	UserStatusOk       = 1
	UserStatusDisabled = 2
)

type User struct {
	Id          uint   `json:"id" form:"id"`
	Phone       string `json:"phone" form:"phone"`
	Name        string `json:"name" form:"name"`
	Duty        string `json:"duty" form:"duty"`
	Status      int    `json:"status" form:"status"`
	Level       int    `json:"level" form:"level"`
	Password    string `json:"password" form:"password"`
	AvatarColor string `json:"avatarColor" form:"avatarColor"`
}
