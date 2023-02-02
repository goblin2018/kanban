import { Form, Input, Modal } from 'antd'
import { Action, ErrCode } from 'api/constatns'
import { updatePassword, User } from 'api/user'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
  user: User
}
const PasswordModal: React.FC<Props> = ({ show, setShow, user }) => {
  const cancel = () => {
    setShow(false)
  }

  const submit = () => {
    passwordForm.validateFields().then((vs) => {
      if (vs.np != vs.rnp) {
        passwordForm.setFields([
          { name: 'rnp', errors: ['请输入相同的新密码！'] },
        ])
        return
      }

      if (vs.np == vs.op) {
        return
      }

      updatePassword({
        id: user.id!,
        op: vs.op,
        np: vs.np,
        action: Action.Update,
      }).then((res) => {
        switch (res.code) {
          case ErrCode.Forbidden:
            passwordForm.setFields([
              { name: 'op', errors: ['没有权限修改密码！'] },
            ])
            break
          case ErrCode.InvalidPassword:
            passwordForm.setFields([{ name: 'op', errors: ['错误的旧密码！'] }])
            break
          default:
            cancel()
        }
      })
    })
  }

  const [passwordForm] = Form.useForm()
  return (
    <Modal open={show} onCancel={cancel} onOk={submit} title="修改密码">
      <Form form={passwordForm} layout="vertical">
        <Form.Item
          label="旧密码"
          name={'op'}
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="新密码"
          name={'np'}
          rules={[{ required: true, message: '请输入新密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="重复新密码"
          name={'rnp'}
          rules={[{ required: true, message: '请输入相同的新密码!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default PasswordModal
