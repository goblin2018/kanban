import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { ReactComponent as Right } from 'assets/right.svg'
import { addTask } from 'api/task'
import { TaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject } from 'reducers/projectSlice'

interface Props {
  taskgroup: TaskGroup
  groupIdx: number
}

const NewTaskItem: React.FC<Props> = ({ taskgroup, groupIdx }) => {
  const [title, setTitle] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()
  const cancel = () => {
    setShowAdd(false)
    setTitle('')
  }

  const submit = () => {
    if (title == '') {
      return
    }

    addTask({
      name: title,
      projectId: taskgroup.projectId,
      taskGroupId: taskgroup.id,
    }).then((res) => {
      // 处理新增task

      let nt = res.data

      let p = { ...project }
      let groups = [...p.taskGroups!]
      let g = { ...groups[groupIdx] }
      let tasks = [...g.tasks!]

      tasks.push({
        id: nt.id,
        serial: nt.serial,
        name: title,
        projectId: taskgroup.projectId,
        taskGroupId: taskgroup.id,
        status: 0,
      })

      g.tasks = tasks
      groups[groupIdx] = g
      p.taskGroups = groups
      dispatch(setCurrentProject(p))
      setShowAdd(false)

      console.log(res.data)
    })
  }
  return (
    <div className="mt-4">
      {showAdd ? (
        <div className="my-2">
          <Input.TextArea
            value={title}
            onChange={(e) => {
              let v = e.target.value
              setTitle(v.trim())
            }}
          />
          <div className="py-1">
            <Button
              type="text"
              icon={<Right className="w-4 h-4 mr-2" />}
              className="flex items-center"
            >
              任务
            </Button>
          </div>
          <div className="p-1">
            <Button type="primary" className="mr-2" onClick={submit}>
              确认
            </Button>
            <Button type="text" onClick={cancel}>
              取消
            </Button>
          </div>
        </div>
      ) : (
        <Button
          icon={<PlusOutlined />}
          style={{ width: '100%' }}
          onClick={() => {
            setShowAdd(true)
          }}
        ></Button>
      )}
    </div>
  )
}

export default NewTaskItem
