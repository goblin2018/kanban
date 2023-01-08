import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddModal from './addModal'
import ProjectCard from './projectCard'
import { listProjects, openAddModal, setCurrentProject } from './projectSlice'

const ProjectPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const ps = useAppSelector((s) => s.project.items)
  useEffect(() => {
    dispatch(listProjects())
  }, [])
  return (
    <>
      <Button
        onClick={() => {
          dispatch(openAddModal())
        }}
      >
        创建项目
      </Button>
      <AddModal />

      <div className="flex">
        {ps?.map((p, idx) => (
          <ProjectCard
            project={p}
            key={`${idx}project`}
            onClick={() => {
              dispatch(setCurrentProject(p))
              navigate('/project')
            }}
          />
        ))}
      </div>
    </>
  )
}

export default ProjectPage
