import { Avatar } from 'antd'
import { User } from 'api/user'

interface Props {
  user?: User
  size?: 'middle' | 'large'
}

const UserAvatar: React.FC<Props> = ({ user, size = 'middle' }) => {
  return (
    <Avatar
      style={{ backgroundColor: user?.avatarColor }}
      size={size == 'middle' ? 32 : 48}
    >
      {user?.name?.substring(user.name.length - 2)}
    </Avatar>
  )
}

export default UserAvatar
