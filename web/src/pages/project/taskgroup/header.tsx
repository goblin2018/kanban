import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Input, Popconfirm } from 'antd'
import { delTaskGroup, TaskGroup, updateTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  setCurrentProject,
  setCurrentTaskGroup,
  setTaskGroups,
} from 'reducers/projectSlice'

import { groupPadding, taskWidth } from '../constants'

interface Props {
  taskgroup: TaskGroup
  setDraggable: (draggable: boolean) => void
}
const TaskgroupHeader: React.FC<Props> = ({ taskgroup, setDraggable }) => {
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const canEdit = useAppSelector((s) => s.project.canEdit)
  const dispatch = useAppDispatch()

  return (
    <div className="mb-2 ">
      <div
        className="h-4 mb-2 rounded-t-xl"
        style={{ background: taskgroup.color }}
      ></div>
      <div
        className="flex h-6 "
        style={{ width: taskWidth, marginLeft: groupPadding }}
      >
        <div
          className="text-bold mb-4 flex-1"
          onMouseEnter={(e) => {
            setDraggable(true)
          }}
          onMouseLeave={(e) => {
            setDraggable(false)
          }}
        >
          {taskgroup.name}
        </div>
        <div className="w-6 h-6 flex-shrink-0 flex justify-center">
          {canEdit && (
            <Dropdown
              // trigger={['click']}
              dropdownRender={() => (
                <div className="bg-white flex flex-col w-[100px]">
                  <Button
                    type="text"
                    onClick={() => {
                      dispatch(setCurrentTaskGroup(taskgroup))
                    }}
                  >
                    编辑
                  </Button>
                  <Popconfirm
                    title={'确认删除用户组？'}
                    placement="bottomLeft"
                    trigger={['click']}
                    onConfirm={() => {
                      // 删除
                      delTaskGroup(taskgroup).then((res) => {
                        let ts = [...taskGroups]
                        let idx = ts.findIndex((g) => g.id == taskgroup.id)
                        ts.splice(idx, 1)
                        dispatch(setTaskGroups(ts))
                      })
                    }}
                  >
                    <Button type="text" danger>
                      删除
                    </Button>
                  </Popconfirm>
                </div>
              )}
            >
              <MoreOutlined className="hover:bg-slate-200 w-6 h-6 flex justify-center rounded" />
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskgroupHeader
