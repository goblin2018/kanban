import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  openTaskGroupModal,
  setCurrentProject,
} from 'pages/project/projectSlice'
import TaskGroupModal from './taskgroupModal'
import { useEffect, useState } from 'react'
import { getProjectDetail } from 'api/project'
import TaskGroupItem from './taskgroup'

const ProjectDetailPage = () => {
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log(project)
    getProjectDetail(project!.id!).then((res) => {
      dispatch(setCurrentProject(res.data))
    })
  }, [])
  return (
    <div>
      <div className="flex border-b-2 py-4 items-center">
        <div className="text-3xl mr-4">{project?.name}</div>
        <Button
          onClick={() => {
            dispatch(openTaskGroupModal())
          }}
        >
          添加任务组
        </Button>
        <TaskGroupModal />
      </div>
      <div>
        <div id="groups-dragging-container"></div>
        <div className="flex" id="groups-container">
          {project?.taskGroups?.map((tg, idx) => (
            <TaskGroupItem taskgroup={tg} key={`taskgroup${idx}`} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage
