import { Avatar, Button, Divider, Dropdown, MenuProps } from 'antd'
import { UserLevel } from 'api/user'
import { useAppSelector } from 'app/hooks'
import UserAvatar from 'components/userAvatar'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const user = useAppSelector((s) => s.user.my)
  const navigate = useNavigate()
  const logout = () => {
    navigate('/login')
  }

  return (
    <div className="flex justify-between h-16 items-center mx-[100px]">
      <div></div>
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
