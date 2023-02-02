package api

const (
	DefaultPassword    = "senmeng66"
	UserLevelNormal    = 1
	UserLevelAdmin     = 100
	UserStatusOk       = 1
	UserStatusDisabled = 2

	Update = "update"
	Reset  = "reset"
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

type UpdatePasswordReq struct {
	Id     uint   `json:"id" form:"id"`
	Action string `json:"action" form:"action"`
	Op     string `json:"op" form:"op"`
	Np     string `json:"np" form:"np"`
}
