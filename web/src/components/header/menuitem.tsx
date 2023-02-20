import { Avatar } from 'antd'
import { ReactNode } from 'react'

interface Props {
  label: string
  icon: ReactNode
  onClick?: () => void
}

const MenuItem: React.FC<Props> = ({ label, icon, onClick }) => {
  return (
    <div
      className="flex items-center justify-center h-full bg-white px-4 min-w-[110px] cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <div className="ml-2">{label}</div>
    </div>
  )
}

export default MenuItem
