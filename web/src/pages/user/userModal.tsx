import { Form, Input, Modal, notification, Select, Tag } from 'antd'
import { ErrCode, ModalState } from 'api/constatns'
import { addUser, updateUser, User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useMemo } from 'react'
import { setUsers } from 'reducers/userSlice'

interface Props {
  state: ModalState
  setState: (s: ModalState) => void
  setShouldUpdateUsers: (b: boolean) => void
}
const UserModal: React.FC<Props> = ({
  state,
  setState,
  setShouldUpdateUsers,
}) => {
  const { users, editIndex } = useAppSelector((s) => s.user)
  const [userForm] = Form.useForm()
  const cancel = () => {
    setState('close')
  }

  const user = useMemo(() => users[editIndex!], [users, editIndex])
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (state == 'edit') {
      userForm.setFieldsValue({ ...user })
    } else if (state == 'add') {
      userForm.setFieldsValue({ level: 1 })
    }
  }, [state])

  const submit = () => {
    userForm.validateFields(['name', 'phone', 'level']).then((vs) => {
      let nu = { ...vs } as User

      if (state == 'add') {
        // 添加用户

        console.log('add new user ', nu)
        addUser(nu).then((res) => {
          switch (res.code) {
            case ErrCode.Ok:
              // 重新请求数据
              notification.success({
                message: '操作成功',
                description: '创建用户成功',
              })
              setShouldUpdateUsers(true)
              cancel()
              break
            case ErrCode.Forbidden:
              notification.warning({ message: '没有权限创建用户' })
              break
            case ErrCode.UserAlreadyExists:
              notification.warning({
                message: '操作失败',
                description: '存在相同信息的用户',
              })
              break
          }
        })
      } else {
        // 修改用户信息
        nu.id = user.id

        if (
          nu.name == user.name &&
          nu.phone == user.phone &&
          nu.level == user.level
        ) {
          return
        }
        updateUser(nu).then((res) => {
          switch (res.code) {
            case ErrCode.Ok:
              // update users info
              let nus = [...users!]
              nus[editIndex!] = { ...user, ...nu }
              dispatch(setUsers(nus))

              notification.success({
                message: '操作成功',
                description: '修改用户信息成功',
              })
              cancel()
              break
            case ErrCode.Forbidden:
              notification.warning({
                message: '无操作权限',
              })
              break
            case ErrCode.UserAlreadyExists:
              notification.warning({
                message: '操作失败',
                description: '存在相同的用户信息',
              })
              break
          }
        })
      }
    })
  }
  return (
    <Modal
      open={state != 'close'}
      title={`${state == 'add' ? '添加' : '修改'}用户`}
      onCancel={cancel}
      onOk={submit}
    >
      <Form form={userForm} layout={'vertical'}>
        <Form.Item
          label="姓名"
          name={'name'}
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="用户类型" name="level">
          <Select
            options={[
              { value: 1, label: '普通用户' },
              { value: 100, label: '管理员' },
            ]}
          />
        </Form.Item>
      </Form>
      <Tag className="py-1 px-4" color="success">
        新用户默认密码为: senmeng66
      </Tag>
    </Modal>
  )
}

export default UserModal
