import { Button, Card, Form, Input } from 'antd'
import { login } from 'api/user'
import { useAppDispatch } from 'app/hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'reducers/userSlice'

import logo from 'assets/sm.png'
import { ReactComponent as Phone } from 'assets/phone.svg'
import { ReactComponent as Lock } from 'assets/lock.svg'

const LoginForm = () => {
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
    <div className="w-[340px] pt-[10%] relative">
      <div className="w-[142px] h-[58px] rounded-xl bg-green-700 mb-[72px] py-1 px-[6px]">
        <img src={logo} height={50} />
      </div>

      <div className="text-xl mb-16">您好，请先登录</div>
      <Form
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        form={loginForm}
        layout="vertical"
        onFinish={submit}
        requiredMark={false}
      >
        <Form.Item
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号!' }]}
        >
          <Input
            prefix={<Phone />}
            placeholder="请输入手机号"
            
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item
          name={'password'}
          label="密码"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            prefix={<Lock />}
            
            placeholder="请输入密码"
            autoComplete="on"
          />
        </Form.Item>
        <Form.Item className="mt-20">
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

      <div className="absolute bottom-4 w-full text-center">深圳市森盟科技有限公司</div>
    </div>
  )
}

export default LoginForm
