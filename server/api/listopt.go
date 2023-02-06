package api

type ListOpt struct {
	Offset int  `json:"offset" form:"offset"`
	Limit  int  `json:"limit" form:"limit"`
	All    bool `json:"all" form:"all"`
}

type ListRes[T any] struct {
	Items []T   `json:"items" form:"items"`
	Total int64 `json:"total" form:"total"`
}
