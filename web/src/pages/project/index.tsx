import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  openTaskGroupModal,
  setCurrentProject,
} from 'pages/projects/projectSlice'
import TaskGroupModal from './taskgroup/taskgroupModal'
import { useEffect, useState } from 'react'
import { getProjectDetail } from 'api/project'
import TaskGroupItem from './taskgroup/taskgroup'
import ProjectMenu from './projectmenu'
import { Outlet, useNavigate } from 'react-router-dom'
import EditTaskModal from './task/editModal'

const ProjectDetailPage = () => {
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(project)
    getProjectDetail(project!.id!).then((res) => {
      dispatch(setCurrentProject(res.data))
    })
  }, [])
  return (
    <div>
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
            dispatch(openTaskGroupModal())
          }}
        >
          添加任务组
        </Button>
        <TaskGroupModal />
        <EditTaskModal />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default ProjectDetailPage
