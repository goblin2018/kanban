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
       
      ${
        active
          ? 'text-blue-500 bg-[#f5f7fa]'
          : 'text-white bg-blue-500 hover:bg-blue-400'
      }
      `}
      onClick={onClick}
    >
      {icon}
      <div className="ml-2">{label}</div>
    </div>
  )
}

export default MenuItem
