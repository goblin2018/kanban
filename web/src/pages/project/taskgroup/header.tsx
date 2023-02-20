import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Input, Popconfirm } from 'antd'
import { TaskGroup, updateTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject, setTaskGroups } from 'reducers/projectSlice'
import { useState } from 'react'
import { CirclePicker, Color } from 'react-color'

interface Props {
  taskgroup: TaskGroup
  setDraggable: (draggable: boolean) => void
}
const TaskgroupHeader: React.FC<Props> = ({ taskgroup, setDraggable }) => {
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const dispatch = useAppDispatch()

  const [name, setName] = useState(taskgroup.name)
  const [color, setColor] = useState<Color>(taskgroup.color!)

  const submitName = () => {
    if (name == taskgroup.name || name == '') {
      return
    }

    // 提交
    updateTaskGroup({ id: taskgroup.id, name: name }).then((res) => {
      // 更新名称
      let tgs = [...taskGroups]
      let i = tgs.findIndex((t) => t.id == taskgroup.id)
      tgs[i] = { ...tgs[i], name: name }
      dispatch(setTaskGroups(tgs))
    })
  }

  const submitColor = (color: string) => {
    if (color == taskgroup.color) {
      return
    }
    // 提交
    updateTaskGroup({ id: taskgroup.id, color: color }).then((res) => {
      // 更新名称
      let tgs = [...taskGroups]
      let i = tgs.findIndex((t) => t.id == taskgroup.id)
      tgs[i] = { ...tgs[i], color: color }
      dispatch(setTaskGroups(tgs))
    })
  }

  return (
    <div className="mb-2 ">
      <div
        className="h-4 mb-2 rounded-t-xl"
        style={{ background: taskgroup.color }}
      ></div>
      <div className="flex h-6  w-[312px]  ml-6">
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
          <Dropdown
            // trigger={['click']}
            dropdownRender={() => (
              <div className="bg-white flex flex-col w-[100px]">
                <Button type="text" size="large">
                  编辑
                </Button>
                <Popconfirm
                  title={'确认删除用户组？'}
                  placement="bottomLeft"
                  trigger={['click']}
                >
                  <Button type="text" danger size="large">
                    删除
                  </Button>
                </Popconfirm>
              </div>
            )}
          >
            <MoreOutlined />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default TaskgroupHeader
