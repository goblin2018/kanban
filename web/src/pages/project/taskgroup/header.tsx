import { MoreOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Input } from 'antd'
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
    <div className="flex">
      <div
        className="text-xl mb-4 flex-1"
        onMouseEnter={(e) => {
          setDraggable(true)
        }}
        onMouseLeave={(e) => {
          setDraggable(false)
        }}
      >
        {taskgroup.name}
      </div>
      <div className="w-10 h-10 flex-shrink-0 flex justify-center">
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <Card className="">
              <div className="flex">
                <Input
                  value={name}
                  onChange={(e) => {
                    let v = e.target.value.trim()
                    setName(v)
                  }}
                  className={'mr-2'}
                />
                <Button type="primary" onClick={submitName}>
                  确认
                </Button>
              </div>

              <div>选择主题色</div>
              <CirclePicker
                color={color}
                onChange={(c, e) => {
                  setColor(c.hex)
                  submitColor(c.hex)
                }}
              />
            </Card>
          )}
        >
          <MoreOutlined />
        </Dropdown>
      </div>
    </div>
  )
}

export default TaskgroupHeader
