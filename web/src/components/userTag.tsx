import { Theme } from 'api/constatns'
import { User } from 'api/user'
import UserAvatar from './userAvatar'

interface Props {
  user: User
  theme?: Theme
}

const UserTag: React.FC<Props> = ({ user, theme = 'light' }) => {
  return (
    <div className="flex items-center cursor-pointer">
      <UserAvatar user={user} />
      <div className={`ml-2 ${theme == 'dark' ? 'text-white' : ''}`}>
        {user.name}
      </div>
    </div>
  )
}

export default UserTag
