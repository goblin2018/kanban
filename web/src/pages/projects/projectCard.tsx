import { Button, Card, Dropdown, Popconfirm, Typography } from 'antd'
import { ProjectStatusInfo } from 'api/constatns'
import { delProject, Project } from 'api/project'
import { toShortDate } from 'api/utils'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import StatusTag from 'components/statustag'
import UserTag from 'components/userTag'
import { useNavigate } from 'react-router-dom'
import {
  setCanEditProject,
  setCurrentProject,
  setProjectModalState,
  setTotalProjects,
} from 'reducers/projectSlice'
import { MoreOutlined } from '@ant-design/icons'
import { ReactComponent as GotoSvg } from 'assets/goto.svg'

import './project.css'
import { UserLevel } from 'api/user'

const { Text } = Typography
interface Props {
  project: Project
}
const ProjectCard: React.FC<Props> = ({ project }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const projects = useAppSelector((s) => s.project.totalProjects)
  const user = useAppSelector((s) => s.user.my)

  const canEdit = user?.level == UserLevel.Admin || user!.id == project.ownerId

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
          style={{ background: project.color }}
        ></div>

        <div className="px-6 py-4">
          <div className="text-xl">{project.name}</div>

          <div className="mt-2">
            <StatusTag status={project.status!} />
          </div>

          <div className="absolute bottom-8">
            <UserTag user={project.owner!} />
          </div>
          <div className="text-xs text-text-disabled absolute bottom-4 right-4">
            {project.startAt
              ? `${toShortDate(project.startAt, '/')} - ${toShortDate(
                  project.endAt,
                  '/'
                )}`
              : ''}
          </div>

          <Button
            type="text"
            className="absolute right-4 bottom-8"
            onClick={() => {
              dispatch(setCurrentProject(project))
              dispatch(setCanEditProject(canEdit))
              navigate('/project')
            }}
          >
            <div className="flex items-center">
              <div className="mr-1">进入项目</div>
              <GotoSvg />
            </div>
          </Button>

          {canEdit && (
            <Dropdown
              className="absolute right-4 top-8"
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <div
                        onClick={(e) => {
                          // 编辑任务
                          e.stopPropagation()
                          dispatch(setCurrentProject(project))
                          dispatch(setProjectModalState('edit'))
                        }}
                      >
                        编辑
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <Popconfirm
                        title={'确认删除项目？'}
                        onConfirm={() => {
                          delProject(project).then((res) => {
                            let ps = [...projects]
                            let idx = ps.findIndex((p) => p.id == project.id)
                            ps.splice(idx, 1)
                            dispatch(setTotalProjects(ps))
                          })
                        }}
                      >
                        <Text type="danger">删除</Text>
                      </Popconfirm>
                    ),
                  },
                ],
              }}
            >
              <MoreOutlined className="w-6 h-6 hover:bg-slate-200 rounded flex items-center justify-center" />
            </Dropdown>
          )}
        </div>
      </Card>
    </div>
  )
}

export default ProjectCard
