import { Form, Input, Modal, Select, Tag } from 'antd'
import { ModalState } from 'api/constatns'
import { addUser } from 'api/user'

interface Props {
  state: ModalState
  setState: (s: ModalState) => void
}
const UserModal: React.FC<Props> = ({ state, setState }) => {
  const [userForm] = Form.useForm()
  const cancel = () => {
    setState('close')
  }

  const submit = () => {
    userForm.validateFields(['name', 'phone']).then((vs) => {
      console.log('get user ', vs)

      if (state == 'add') {
        // 添加用户
        addUser(vs).then((res) => {
          //
        })
      } else {
        // 修改用户信息
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
      <Form>
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
            defaultValue={1}
            options={[
              { value: 1, label: '普通用户' },
              { value: 100, label: '管理员' },
            ]}
          />
        </Form.Item>
      </Form>
      <Tag color="success">新用户默认密码为: senmeng66</Tag>
    </Modal>
  )
}

export default UserModal
