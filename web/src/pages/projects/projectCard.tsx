import { Card } from 'antd'
import { Project } from 'api/project'
import { toShortDate } from 'api/utils'

const { Meta } = Card
interface Props {
  project: Project
  onClick: () => void
}
const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <>
      <Card
        className="mr-6"
        hoverable
        style={{ width: 240 }}
        cover={<div className="bg-emerald-300 text-4xl">Project</div>}
        onClick={onClick}
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
      </Card>
    </>
  )
}

export default ProjectCard
