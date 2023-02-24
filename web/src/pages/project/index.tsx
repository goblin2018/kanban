import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTaskGroupModalState } from 'reducers/projectSlice'
import TaskGroupModal from './taskgroup/modal'

import ProjectMenu from './projectmenu'
import { Outlet, useNavigate } from 'react-router-dom'
import TaskDrawer from './task/taskDrawer'
import Header from 'components/header/Header'
import { PlusOutlined } from '@ant-design/icons'
import { ReactComponent as GotoSvg } from 'assets/goto.svg'
import { toShortDate } from 'api/utils'
import ViewModeSwither from 'components/gantt/viewmodeSwitcher'

const ProjectDetailPage = () => {
  const {
    currentProject: project,
    page,
    canEdit,
  } = useAppSelector((s) => s.project)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <div>
      <Header />
      <div className="flex border-b-2 pt-4 items-center px-[40px]">
        <div className="flex items-center">
          <GotoSvg
            className="rotate-180 mr-2 cursor-pointer hover:text-blue-500"
            onClick={() => {
              navigate('/')
            }}
          />
          <div className="text-bold mr-4">{project.name}</div>
          <div className="flex text-xs items-center">
            <div>负责人：{project.owner?.name}</div>
            {project.startAt ? (
              <>
                <div className="w-px h-3 bg-text-disabled mx-2"></div>
                {`项目日期：${toShortDate(
                  project.startAt,
                  '/'
                )} - ${toShortDate(project.endAt, '/')}`}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <TaskGroupModal />
      </div>

      <div className="flex justify-between px-6">
        <div className="">
          <ProjectMenu />
        </div>

        {page == '' ? (
          <div>
            {canEdit && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  dispatch(setTaskGroupModalState('add'))
                }}
              >
                添加任务组
              </Button>
            )}
          </div>
        ) : (
          <ViewModeSwither />
        )}
      </div>

      <div className="h-px bg-text-disabled mx-6"></div>

      <div className="h-[calc(100vh-151px)] min-h-[600px]">
        <Outlet />
      </div>
      <TaskDrawer />
    </div>
  )
}

export default ProjectDetailPage
