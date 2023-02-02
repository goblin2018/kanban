import { Button, Card, Form, Input } from 'antd'
import { login } from 'api/user'
import { useAppDispatch } from 'app/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'reducers/userSlice'

const Login = () => {
  const [loginForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const submit = (values: any) => {
    setLoading(true)
    login(values)
      .then((res) => {
        console.log(res)

        switch (res.code) {
          case 2004:
            loginForm.setFields([
              {
                name: 'phone',
                value: values.phone,
                errors: ['用户不存在'],
              },
            ])
            break
          case 2005:
            loginForm.setFields([
              {
                name: 'password',
                value: values.password,
                errors: ['密码错误'],
              },
            ])
            break
          default:
            dispatch(setUser(res.data))
            navigate('/')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <Form
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          form={loginForm}
          layout="vertical"
          onFinish={submit}
        >
          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号!' }]}
          >
            <Input placeholder="手机号" size="large" autoComplete="on" />
          </Form.Item>
          <Form.Item
            name={'password'}
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password
              size="large"
              placeholder="密码"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
