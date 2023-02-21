import { Avatar, Button, Divider, Dropdown, Menu, MenuProps } from 'antd'
import { UserLevel } from 'api/user'
import { useAppSelector } from 'app/hooks'
import UserAvatar from 'components/userAvatar'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ProjectSvg } from 'assets/project.svg'

import logo from 'assets/sm.png'
import { setCurrentProject } from 'reducers/projectSlice'
import { useState } from 'react'
import MenuItem from './menuitem'
import UserTag from 'components/userTag'

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
      icon: <ProjectSvg />,
    },
    // {
    //   label: 'Navigation Two',
    //   key: 'app',
    //   icon: <AppstoreOutlined />,
    //   disabled: true,
    // },
  ]

  const [currentPage, setCurrentPage] = useState('/')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentPage(e.key)
  }

  return (
    <div className="flex justify-between h-12 items-center px-[100px] bg-blue-500">
      <div className="flex h-full">
        <div className="mr-16">
          <img src={logo} height={48} width={126} />
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

                console.log('currentPage ', currentPage)
              }}
              active={it.key == currentPage}
            />
          ))}
        </div>
      </div>
      <Dropdown
        dropdownRender={() => (
          <div className="bg-white rounded absolute top-2">
            <div>
              <Link to={'/user'}>
                <Button type="text" >
                  个人中心
                </Button>
              </Link>
            </div>
            <div>
              {user?.level == UserLevel.Admin ? (
                <Link to={'/users'}>
                  <Button type="text" >
                    用户管理
                  </Button>
                </Link>
              ) : null}
            </div>
            <div className="h-px w-full bg-gray-300 px-2 my-2 bg-clip-content"></div>
            <Button type="text"  onClick={logout}>
              退出登录
            </Button>
          </div>
        )}
      >
        <div>
          <UserTag user={user!} theme="dark" />
        </div>
      </Dropdown>
    </div>
  )
}

export default Header
