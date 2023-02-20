import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { ReactComponent as Right } from 'assets/right.svg'
import { addTask } from 'api/task'
import { TaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject, setTaskGroups } from 'reducers/projectSlice'

interface Props {
  taskgroup: TaskGroup
  groupIdx: number
  atBottom?: boolean
}

const NewTaskItem: React.FC<Props> = ({
  taskgroup,
  groupIdx,
  atBottom = false,
}) => {
  const [title, setTitle] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
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

      let groups = [...taskGroups]
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
      dispatch(setTaskGroups(groups))
      setShowAdd(false)

      console.log(res.data)
    })
  }

  return (
    <div className="mt-2">
      {showAdd ? (
        <div
          className={`${
            atBottom
              ? 'fixed bottom-0 w-[360px] bg-white pl-5 pr-7 pt-4'
              : 'my-2 pl-5  pr-5'
          }`}
        >
          <Input.TextArea
            value={title}
            onChange={(e) => {
              let v = e.target.value
              setTitle(v.trim())
            }}
          />

          <div className="flex justify-between py-2">
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
        </div>
      ) : (
        <Button
          size="large"
          icon={<PlusOutlined />}
          style={{ width: 312, marginLeft: 20 }}
          onClick={() => {
            setShowAdd(true)
          }}
        >
          添加任务
        </Button>
      )}
    </div>
  )
}

export default NewTaskItem
