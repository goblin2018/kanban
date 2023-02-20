import { Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectModal from './projectModal'
import ProjectCard from './projectCard'
import { listProjects, setProjectModalState } from '../../reducers/projectSlice'
import Header from 'components/header/Header'
import { PlusOutlined } from '@ant-design/icons'

const ProjectPage = () => {
  const dispatch = useAppDispatch()
  const ps = useAppSelector((s) => s.project.items)
  useEffect(() => {
    dispatch(listProjects())
  }, [])
  return (
    <div>
      <Header />
      <ProjectModal />

      <div className="w-[1596px] mx-auto bg-white py-8 rounded-xl">
        <div
          className="w-full px-12 mb-5 pb-4"
          style={{ boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.05)' }}
        >
          <div className="flex w-full justify-between">
            <div className="text-xl">全部项目</div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size={'large'}
              onClick={() => {
                dispatch(setProjectModalState('add'))
              }}
            >
              创建项目
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap -mr-5 px-12">
          {ps?.map((p, idx) => (
            <ProjectCard project={p} key={`${idx}project`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
