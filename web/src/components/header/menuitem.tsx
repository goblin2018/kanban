import { ReactNode } from 'react'

interface Props {
  label: string
  icon: ReactNode
  onClick?: () => void
  active?: boolean
}

const MenuItem: React.FC<Props> = ({
  label,
  icon,
  onClick,
  active = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center h-full px-4 min-w-[110px] cursor-pointer
       hover:bg-blue-400 hover:text-white
      ${active ? 'text-blue-500 bg-white' : 'text-white bg-blue-500'}
      `}
      onClick={onClick}
    >
      {icon}
      <div className="ml-2">{label}</div>
    </div>
  )
}

export default MenuItem
