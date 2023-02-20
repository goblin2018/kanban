import { Avatar, Button, Divider, Dropdown, Menu, MenuProps } from 'antd'
import { UserLevel } from 'api/user'
import { useAppSelector } from 'app/hooks'
import UserAvatar from 'components/userAvatar'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as Project } from 'assets/project.svg'

import logo from 'assets/sm.png'
import { setCurrentProject } from 'reducers/projectSlice'
import { useState } from 'react'
import MenuItem from './menuitem'

const Header = () => {
  const user = useAppSelector((s) => s.user.my)
  const navigate = useNavigate()
  const logout = () => {
    navigate('/login')
  }

  const items = [
    {
      label: '项目',
      key: '/',
      icon: <Project />,
    },
    // {
    //   label: 'Navigation Two',
    //   key: 'app',
    //   icon: <AppstoreOutlined />,
    //   disabled: true,
    // },
  ]

  const [currentPage, setCurrentPage] = useState('')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentPage(e.key)
  }

  return (
    <div className="flex justify-between h-16 items-center px-[100px] bg-blue-500">
      <div className="flex h-full">
        <div>
          <img src={logo} height={50} />
        </div>

        <div>
          {items.map((it) => (
            <MenuItem
              label={it.label}
              key={it.key}
              icon={it.icon}
              onClick={() => {
                navigate(it.key)
                setCurrentPage(it.key)
              }}
            />
          ))}
        </div>
      </div>
      <Dropdown
        dropdownRender={() => (
          <div>
            <div>
              <Link to={'/user'}>我的</Link>
            </div>
            <div>
              {user?.level == UserLevel.Admin ? (
                <Link to={'/users'}>管理用户</Link>
              ) : null}
            </div>
            <div className="h-0 w-full border-b border-gray-300 my-2"></div>
            <Button type="text" onClick={logout}>
              登出
            </Button>
          </div>
        )}
      >
        <div className="flex items-center mx-4 cursor-pointer">
          <UserAvatar user={user} />
          <div className="ml-2">{user?.name}</div>
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
