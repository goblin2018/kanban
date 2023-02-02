package api

type ListOpt struct {
	Offset int `json:"offset" form:"offset"`
	Limit  int `json:"limit" form:"limit"`
}

type ListRes[T any] struct {
	Items []T   `json:"items" form:"items"`
	Total int64 `json:"total" form:"total"`
}
