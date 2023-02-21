import { Button, Form, Input } from 'antd'
import { updateUser, User, UserLevel } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import Header from 'components/header/Header'
import UserAvatar from 'components/userAvatar'
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

  const [changed, setChanged] = useState(false)

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="w-[636px] mx-auto rounded-xl px-[148px] bg-white py-[100px] mt-10">
          <div className="flex justify-between mb-8">
            <div className="flex">
              <UserAvatar user={user}  />
              <div className="ml-4">
                <div className="text-xl">{user?.name}</div>
                <div className="text-xs text-blue-500">
                  {user?.level == UserLevel.Normal ? '普通用户' : '管理员'}
                </div>
              </div>
            </div>

            <div className="">
              <Button
                onClick={() => {
                  setShowPasswordModal(true)
                }}
                // type="text"
              >
                修改密码
              </Button>
            </div>
          </div>
          <Form
            form={userForm}
            layout="vertical"
            initialValues={{ ...user }}
            requiredMark={false}
            onValuesChange={(e) => {
              setChanged(true)
            }}
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

          <div className="mb-2">头像颜色</div>
          <CirclePicker
            color={user?.avatarColor}
            onChange={(c, e) => {
              dispatch(setUser({ ...user, avatarColor: c.hex }))
              updateUser({ id: user!.id, avatarColor: c.hex })
            }}
          />

          <div className="flex justify-end mt-6">
            {changed && (
              <>
                <Button
                  className="mr-4"
                  onClick={() => {
                    userForm.setFieldsValue({ ...user })
                    setChanged(false)
                  }}
                >
                  取消
                </Button>
                <Button type="primary" onClick={submit} loading={loading}>
                  确认
                </Button>
              </>
            )}
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
