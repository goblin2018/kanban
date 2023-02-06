import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectModal from './projectModal'
import ProjectCard from './projectCard'
import { listProjects, setProjectModalState } from '../../reducers/projectSlice'
import Header from 'components/header/Header'

const ProjectPage = () => {
  const dispatch = useAppDispatch()
  const ps = useAppSelector((s) => s.project.items)
  useEffect(() => {
    dispatch(listProjects())
  }, [])
  return (
    <>
      <Header />
      <Button
        onClick={() => {
          dispatch(setProjectModalState('add'))
        }}
      >
        创建项目
      </Button>
      <ProjectModal />

      <div className="flex">
        {ps?.map((p, idx) => (
          <ProjectCard project={p} key={`${idx}project`} />
        ))}
      </div>
    </>
  )
}

export default ProjectPage
