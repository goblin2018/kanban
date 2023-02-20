import { Button, Card } from 'antd'
import { ProjectStatusInfo } from 'api/constatns'
import { Project } from 'api/project'
import { toShortDate } from 'api/utils'
import { useAppDispatch } from 'app/hooks'
import StatusTag from 'components/statustag'
import UserTag from 'components/userTag'
import { useNavigate } from 'react-router-dom'
import { setCurrentProject, setProjectModalState } from 'reducers/projectSlice'
import './project.css'
interface Props {
  project: Project
}
const ProjectCard: React.FC<Props> = ({ project }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // const
  return (
    <div>
      <Card
        className="mb-4 rounded-2xl mr-5 relative"
        hoverable
        style={{ width: 360, height: 208 }}
      >
        <div
          className="h-4 rounded-t-2xl"
          style={{ background: '#f4af00' }}
        ></div>

        <div className="px-6 py-4">
          <div className="text-xl">{project.name}</div>

          <div className="mt-2">
            <StatusTag status={project.status!} />
          </div>

          <div className="absolute bottom-8">
            <div className="text-xs mb-1">
              {project.startAt
                ? `${toShortDate(project.startAt, '/')} - ${toShortDate(
                    project.endAt,
                    '/'
                  )}`
                : ''}
            </div>

            <UserTag user={project.owner!} />
          </div>

          <Button
            type="text"
            className="absolute right-4 bottom-8"
            onClick={() => {
              dispatch(setCurrentProject(project))
              navigate('/project')
            }}
          >
            进入项目
          </Button>
          <Button
            className="absolute right-4 top-8"
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
