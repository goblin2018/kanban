// Code generated by goctl. DO NOT EDIT.
package types

type Project struct {
	Name    string `json:"name"`
	Desc    string `json:"desc,optional"`
	StartAt int64  `json:"startAt"`
	EndAt   int64  `json:"endAt"`
}

type AddProjectReq struct {
	Project
}

type AddProjectResp struct {
	Project
}
