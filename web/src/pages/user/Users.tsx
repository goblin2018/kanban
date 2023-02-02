import {
  Button,
  Divider,
  Pagination,
  Popconfirm,
  Table,
  TableColumnsType,
  Tag,
} from 'antd'
import { Action, ModalState } from 'api/constatns'
import { listUsers, updatePassword, User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Header from 'components/header/Header'
import { useEffect, useState } from 'react'
import { setPage } from 'reducers/userSlice'
import UserModal from './userModal'

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)

  const page = useAppSelector((s) => s.user.page!)
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
      render: (v, r) => {
        return (
          <div className="flex">
            <Button>修改</Button>
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
            <Button>删除</Button>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    listUsers({ offset: page * 10, limit: 10 }).then((res) => {
      if (res.code != 200) {
        return
      }
      setTotal(res.data.total)
      let users = res.data.items
      users.forEach((u: any) => {
        u.key = u.id
      })
      setUsers(users)
    })
  }, [page])
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
      <UserModal state={userModalState} setState={setUserModalState} />
    </div>
  )
}
export default Users
