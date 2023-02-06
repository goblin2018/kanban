import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTaskGroupModalState } from 'reducers/projectSlice'
import TaskGroupModal from './taskgroup/taskgroupModal'

import ProjectMenu from './projectmenu'
import { Outlet, useNavigate } from 'react-router-dom'
import TaskDrawer from './task/taskDrawer'
import Header from 'components/header/Header'

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
              navigate('/project/list')
            }}
          >
            任务列表
          </Button>
        </div>
        <div className="text-3xl mr-4">{project?.name}</div>
        <div>
          <ProjectMenu />
        </div>
        <Button
          onClick={() => {
            dispatch(setTaskGroupModalState('add'))
          }}
        >
          添加任务组
        </Button>
        <TaskGroupModal />
        <TaskDrawer />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProjectDetailPage
