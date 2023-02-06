import { Button, Card } from 'antd'
import { ProjectStatusInfo } from 'api/constatns'
import { Project } from 'api/project'
import { toShortDate } from 'api/utils'
import { useAppDispatch } from 'app/hooks'
import { useNavigate } from 'react-router-dom'
import { setCurrentProject, setProjectModalState } from 'reducers/projectSlice'

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
        className="mr-6"
        hoverable
        style={{ width: 240 }}
        cover={<div className="bg-emerald-300 text-4xl">Project</div>}
      >
        <Meta
          title={project.name}
          description={`${
            project.startAt
              ? `${toShortDate(project.startAt)} - ${toShortDate(
                  project.endAt
                )}`
              : ''
          }`}
        />

        <div className="flex">
          <div className="mr-2">状态</div>
          <div>{ProjectStatusInfo[project.status!].info}</div>
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
      </Card>
    </div>
  )
}

export default ProjectCard
