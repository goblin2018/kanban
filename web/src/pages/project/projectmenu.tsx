import { Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectMenu = () => {
  const [current, setCurrent] = useState('kanban')
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: 'kanban',
      label: '任务看板',
    },
    {
      key: 'gantt',
      label: '甘特图',
    },
  ]

  useEffect(() => {
    if (current == 'kanban') {
      navigate('kanban')
    } else {
      navigate('gantt')
    }
  }, [current])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setCurrent(key)
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  )
}

export default ProjectMenu
