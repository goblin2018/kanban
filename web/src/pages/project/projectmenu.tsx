import { Menu, MenuProps } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageOption, setPage } from 'reducers/projectSlice'

const ProjectMenu = () => {
  const page = useAppSelector((s) => s.project.page)
  const dispatch = useAppDispatch()
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
    navigate(page)
  }, [page])

  const onClick: MenuProps['onClick'] = ({ key }) => {
    dispatch(setPage(key as PageOption))
  }

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[page]}
      mode="horizontal"
      items={items}
    />
  )
}

export default ProjectMenu
