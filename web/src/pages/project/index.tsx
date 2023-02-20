import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTaskGroupModalState } from 'reducers/projectSlice'
import TaskGroupModal from './taskgroup/modal'

import ProjectMenu from './projectmenu'
import { Outlet, useNavigate } from 'react-router-dom'
import TaskDrawer from './task/taskDrawer'
import Header from 'components/header/Header'
import { PlusOutlined } from '@ant-design/icons'

const ProjectDetailPage = () => {
  const project = useAppSelector((s) => s.project.current)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div className="flex border-b-2 py-4 items-center">
        <div>
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            任务列表
          </Button>
        </div>
        <div className="text-xl mr-4">{project?.name}</div>
        <TaskGroupModal />
        <TaskDrawer />
      </div>

      <div className="flex justify-between px-6">
        <div className="">
          <ProjectMenu />
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            dispatch(setTaskGroupModalState('add'))
          }}
        >
          添加任务组
        </Button>
      </div>

      <div className="h-px bg-text-disabled mx-6 mb-4"></div>

      <div className="h-[calc(100vh-191px)] min-h-[600px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ProjectDetailPage
