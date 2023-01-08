import { Dropdown, MenuProps } from 'antd'
import { updateTaskStatus } from 'api/task'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject } from 'pages/projects/projectSlice'
import React from 'react'
import StatusTag from './statustag'

interface Props {
  status: number
  taskId: number
  groupIdx: number
  idx: number
}

const StatusSelector: React.FC<Props> = ({ status, taskId, groupIdx, idx }) => {
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()

  const updateStatusImpl = (ns: number) => {
    if (status == ns) {
      return
    }

    // 修改状态
    updateTaskStatus({ id: taskId, status: ns }).then((res) => {
      let p = { ...project }
      let groups = [...p.taskGroups!]

      let g = { ...groups[groupIdx]! }
      let ts = [...g.tasks!]
      let t = { ...ts[idx] }
      t.status = ns

      ts[idx] = t
      g.tasks = ts
      groups[groupIdx] = g
      p.taskGroups = groups
      dispatch(setCurrentProject(p))
    })
  }

  const items: MenuProps['items'] = [
    {
      label: <StatusTag status={0} />,
      key: '0',
      onClick: () => {
        updateStatusImpl(0)
      },
    },
    {
      label: <StatusTag status={1} />,
      key: '1',
      onClick: () => {
        updateStatusImpl(1)
      },
    },

    {
      label: <StatusTag status={2} />,
      key: '2',
      onClick: () => {
        updateStatusImpl(2)
      },
    },
  ]
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div>
        <StatusTag status={status} />
      </div>
    </Dropdown>
  )
}

export default StatusSelector
