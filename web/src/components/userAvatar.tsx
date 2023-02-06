import { Avatar } from 'antd'
import { User } from 'api/user'

interface Props {
  user: User
}

const UserAvatar: React.FC<Props> = ({ user }) => {
  return (
    <Avatar style={{ backgroundColor: user.avatarColor }}>
      {user.name?.substring(user.name.length - 2)}
    </Avatar>
  )
}

export default UserAvatar
