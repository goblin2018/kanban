import { Button, Card } from 'antd'
import { ProjectStatusInfo } from 'api/constatns'
import { Project } from 'api/project'
import { toShortDate } from 'api/utils'
import { useAppDispatch } from 'app/hooks'
import StatusTag from 'components/statustag'
import { useNavigate } from 'react-router-dom'
import { setCurrentProject, setProjectModalState } from 'reducers/projectSlice'
import './project.css'
const { Meta } = Card
interface Props {
  project: Project
}
const ProjectCard: React.FC<Props> = ({ project }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // const
  return (
    <div
      onClick={() => {
        dispatch(setCurrentProject(project))
        navigate('/project')
      }}
    >
      <Card
        className="mr-6 rounded-2xl"
        hoverable
        style={{ width: 360, height: 208 }}
      >
        <div
          className="h-4 rounded-t-2xl"
          style={{ background: '#f4af00' }}
        ></div>

        <div className="px-6 py-4">
          <div className="text-xl">{project.name}</div>

          <div>
            <StatusTag status={project.status!} />
          </div>
          <div className="text-xs">
            {project.startAt
              ? `${toShortDate(project.startAt)} - ${toShortDate(
                  project.endAt
                )}`
              : ''}
          </div>

          <div className="flex">
            <div className="mr-2">负责人</div>
            <div>{project.owner?.name}</div>
          </div>
          <Button
            onClick={(e) => {
              // 编辑任务
              e.stopPropagation()
              dispatch(setCurrentProject(project))
              dispatch(setProjectModalState('edit'))
            }}
          >
            编辑
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ProjectCard
