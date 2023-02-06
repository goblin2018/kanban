import {
  Button,
  Divider,
  notification,
  Pagination,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
} from 'antd'
import { Action, ErrCode, ModalState } from 'api/constatns'
import { delUser, listUsers, updatePassword, User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Header from 'components/header/Header'
import { useEffect, useState } from 'react'
import { setPage, setUserEditIndex, setUsers } from 'reducers/userSlice'
import UserModal from './userModal'

const Users = () => {
  const [total, setTotal] = useState(0)
  const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false)

  const { page, users } = useAppSelector((s) => s.user)
  const dispatch = useAppDispatch()

  const [userModalState, setUserModalState] = useState<ModalState>('close')

  const columns: TableColumnsType<User> = [
    {
      key: 'id',
      dataIndex: 'id',
      title: '用户ID',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '姓名',
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: '手机号',
    },
    {
      key: 'operation',
      dataIndex: 'operation',
      title: '',
      render: (v, r, index) => {
        return (
          <div className="flex">
            <Button
              onClick={() => {
                dispatch(setUserEditIndex(index))
                setUserModalState('edit')
              }}
            >
              修改
            </Button>
            <Popconfirm
              title={
                <div>
                  <div>确认重置密码？</div>
                  <div>
                    新密码为：<Tag color="#2db7f5">senmeng66</Tag>
                  </div>
                </div>
              }
              onConfirm={() => {
                updatePassword({ id: r.id!, action: Action.Reset })
              }}
            >
              <Button>重置密码</Button>
            </Popconfirm>

            <Popconfirm
              title={'确定删除用户？'}
              onConfirm={() => {
                delUser({ id: r.id }).then((res) => {
                  switch (res.code) {
                    case ErrCode.Ok:
                      setShouldUpdateUsers(true)
                      notification.success({
                        message: '操作成功',
                        description: '删除用户成功',
                      })
                      break
                    case ErrCode.Forbidden:
                      notification.warning({
                        message: '操作失败',
                        description: '没有权限删除用户',
                      })
                      break
                  }
                })
              }}
            >
              <Button>删除</Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    setShouldUpdateUsers(true)
  }, [page])

  useEffect(() => {
    if (shouldUpdateUsers) {
      updateUsers()
      setShouldUpdateUsers(false)
    }
  }, [shouldUpdateUsers])

  const updateUsers = () => {
    listUsers({ offset: page * 10, limit: 10 }).then((res) => {
      if (res.code != 200) {
        return
      }
      setTotal(res.data.total)
      let users = res.data.items
      users.forEach((u: any) => {
        u.key = u.id
      })
      dispatch(setUsers(users))
    })
  }

  return (
    <div className="relative h-screen">
      <Header />
      <Button
        onClick={() => {
          setUserModalState('add')
        }}
      >
        添加用户
      </Button>
      <Table dataSource={users} columns={columns} pagination={false} />
      <Pagination className="absolute bottom-4" current={page} total={total} />
      <UserModal
        state={userModalState}
        setState={setUserModalState}
        setShouldUpdateUsers={setShouldUpdateUsers}
      />
    </div>
  )
}
export default Users
