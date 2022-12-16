// Code generated by goctl. DO NOT EDIT.

package model

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/zeromicro/go-zero/core/stores/builder"
	"github.com/zeromicro/go-zero/core/stores/cache"
	"github.com/zeromicro/go-zero/core/stores/sqlc"
	"github.com/zeromicro/go-zero/core/stores/sqlx"
	"github.com/zeromicro/go-zero/core/stringx"
)

var (
	projectFieldNames          = builder.RawFieldNames(&Project{})
	projectRows                = strings.Join(projectFieldNames, ",")
	projectRowsExpectAutoSet   = strings.Join(stringx.Remove(projectFieldNames, "`id`", "`update_time`", "`create_at`", "`created_at`", "`create_time`", "`update_at`", "`updated_at`"), ",")
	projectRowsWithPlaceHolder = strings.Join(stringx.Remove(projectFieldNames, "`id`", "`update_time`", "`create_at`", "`created_at`", "`create_time`", "`update_at`", "`updated_at`"), "=?,") + "=?"

	cacheKanbanProjectIdPrefix   = "cache:kanban:project:id:"
	cacheKanbanProjectNamePrefix = "cache:kanban:project:name:"
)

type (
	projectModel interface {
		Insert(ctx context.Context, data *Project) (sql.Result, error)
		FindOne(ctx context.Context, id int64) (*Project, error)
		FindOneByName(ctx context.Context, name string) (*Project, error)
		Update(ctx context.Context, data *Project) error
		Delete(ctx context.Context, id int64) error
	}

	defaultProjectModel struct {
		sqlc.CachedConn
		table string
	}

	Project struct {
		Id        int64          `db:"id"`
		CreatedAt time.Time      `db:"created_at"`
		UpdatedAt time.Time      `db:"updated_at"`
		DeletedAt sql.NullTime   `db:"deleted_at"`
		StartAt   sql.NullTime   `db:"start_at"`
		EndAt     sql.NullTime   `db:"end_at"`
		Desc      sql.NullString `db:"desc"` // 项目简介
		Name      string         `db:"name"` // 项目名称
	}
)

func newProjectModel(conn sqlx.SqlConn, c cache.CacheConf) *defaultProjectModel {
	return &defaultProjectModel{
		CachedConn: sqlc.NewConn(conn, c),
		table:      "`project`",
	}
}

func (m *defaultProjectModel) Delete(ctx context.Context, id int64) error {
	data, err := m.FindOne(ctx, id)
	if err != nil {
		return err
	}

	kanbanProjectIdKey := fmt.Sprintf("%s%v", cacheKanbanProjectIdPrefix, id)
	kanbanProjectNameKey := fmt.Sprintf("%s%v", cacheKanbanProjectNamePrefix, data.Name)
	_, err = m.ExecCtx(ctx, func(ctx context.Context, conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("delete from %s where `id` = ?", m.table)
		return conn.ExecCtx(ctx, query, id)
	}, kanbanProjectIdKey, kanbanProjectNameKey)
	return err
}

func (m *defaultProjectModel) FindOne(ctx context.Context, id int64) (*Project, error) {
	kanbanProjectIdKey := fmt.Sprintf("%s%v", cacheKanbanProjectIdPrefix, id)
	var resp Project
	err := m.QueryRowCtx(ctx, &resp, kanbanProjectIdKey, func(ctx context.Context, conn sqlx.SqlConn, v interface{}) error {
		query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", projectRows, m.table)
		return conn.QueryRowCtx(ctx, v, query, id)
	})
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultProjectModel) FindOneByName(ctx context.Context, name string) (*Project, error) {
	kanbanProjectNameKey := fmt.Sprintf("%s%v", cacheKanbanProjectNamePrefix, name)
	var resp Project
	err := m.QueryRowIndexCtx(ctx, &resp, kanbanProjectNameKey, m.formatPrimary, func(ctx context.Context, conn sqlx.SqlConn, v interface{}) (i interface{}, e error) {
		query := fmt.Sprintf("select %s from %s where `name` = ? limit 1", projectRows, m.table)
		if err := conn.QueryRowCtx(ctx, &resp, query, name); err != nil {
			return nil, err
		}
		return resp.Id, nil
	}, m.queryPrimary)
	switch err {
	case nil:
		return &resp, nil
	case sqlc.ErrNotFound:
		return nil, ErrNotFound
	default:
		return nil, err
	}
}

func (m *defaultProjectModel) Insert(ctx context.Context, data *Project) (sql.Result, error) {
	kanbanProjectIdKey := fmt.Sprintf("%s%v", cacheKanbanProjectIdPrefix, data.Id)
	kanbanProjectNameKey := fmt.Sprintf("%s%v", cacheKanbanProjectNamePrefix, data.Name)
	ret, err := m.ExecCtx(ctx, func(ctx context.Context, conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("insert into %s (%s) values (?, ?, ?, ?, ?)", m.table, projectRowsExpectAutoSet)
		return conn.ExecCtx(ctx, query, data.DeletedAt, data.StartAt, data.EndAt, data.Desc, data.Name)
	}, kanbanProjectIdKey, kanbanProjectNameKey)
	return ret, err
}

func (m *defaultProjectModel) Update(ctx context.Context, newData *Project) error {
	data, err := m.FindOne(ctx, newData.Id)
	if err != nil {
		return err
	}

	kanbanProjectIdKey := fmt.Sprintf("%s%v", cacheKanbanProjectIdPrefix, data.Id)
	kanbanProjectNameKey := fmt.Sprintf("%s%v", cacheKanbanProjectNamePrefix, data.Name)
	_, err = m.ExecCtx(ctx, func(ctx context.Context, conn sqlx.SqlConn) (result sql.Result, err error) {
		query := fmt.Sprintf("update %s set %s where `id` = ?", m.table, projectRowsWithPlaceHolder)
		return conn.ExecCtx(ctx, query, newData.DeletedAt, newData.StartAt, newData.EndAt, newData.Desc, newData.Name, newData.Id)
	}, kanbanProjectIdKey, kanbanProjectNameKey)
	return err
}

func (m *defaultProjectModel) formatPrimary(primary interface{}) string {
	return fmt.Sprintf("%s%v", cacheKanbanProjectIdPrefix, primary)
}

func (m *defaultProjectModel) queryPrimary(ctx context.Context, conn sqlx.SqlConn, v, primary interface{}) error {
	query := fmt.Sprintf("select %s from %s where `id` = ? limit 1", projectRows, m.table)
	return conn.QueryRowCtx(ctx, v, query, primary)
}

func (m *defaultProjectModel) tableName() string {
	return m.table
}
