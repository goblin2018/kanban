import { Button, Form, Input } from 'antd'
import { updateUser, User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Header from 'components/header/Header'
import { useEffect, useState } from 'react'
import { CirclePicker } from 'react-color'
import { setUser } from 'reducers/userSlice'
import PasswordModal from './PasswordModal'

const UserInfo = () => {
  const user = useAppSelector((s) => s.user.my)
  const dispatch = useAppDispatch()

  const [userForm] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const submit = () => {
    userForm.validateFields().then((vs) => {
      if (vs.name == user?.name && vs.phone == user?.phone) {
        return
      }
      setLoading(true)
      updateUser({ id: user?.id, phone: vs.phone, name: vs.name }).finally(
        () => {
          setLoading(false)
        }
      )
      dispatch(setUser({ ...user, name: vs.name, phone: vs.phone }))
    })
  }

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="w-[636px] mx-auto rounded-xl">
          <Form
            form={userForm}
            layout="vertical"
            initialValues={{ ...user }}
            requiredMark={false}
          >
            <Form.Item
              label="姓名"
              name={'name'}
              rules={[{ required: true, message: '请输入姓名!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="手机号"
              name={'phone'}
              rules={[{ required: true, message: '请输入手机号!' }]}
            >
              <Input />
            </Form.Item>
          </Form>

          <CirclePicker
            color={user?.avatarColor}
            onChange={(c, e) => {
              dispatch(setUser({ ...user, avatarColor: c.hex }))
              updateUser({ id: user!.id, avatarColor: c.hex })
            }}
          />

          <div>
            <div>职位：</div>
            <div>{user?.duty}</div>
          </div>

          <div>
            <Button type="primary" onClick={submit} loading={loading}>
              确认
            </Button>
          </div>

          <div className="mt-4">
            <Button
              onClick={() => {
                setShowPasswordModal(true)
              }}
            >
              修改密码
            </Button>
          </div>
        </div>
      </div>

      <PasswordModal
        show={showPasswordModal}
        setShow={setShowPasswordModal}
        user={user!}
      />
    </div>
  )
}

export default UserInfo
