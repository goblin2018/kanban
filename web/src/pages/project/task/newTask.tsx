import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { ReactComponent as Right } from 'assets/right.svg'
import { addTask } from 'api/task'
import { TaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject, setTaskGroups } from 'reducers/projectSlice'
import { groupPadding, groupWidth, taskWidth } from '../constants'

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
  const { canEdit, taskGroups } = useAppSelector((s) => s.project)
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
      let tasks = [...(g.tasks || [])]

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
              ? `fixed bottom-0  bg-white pl-4 pr-4 pt-4`
              : 'my-2 pl-4  pr-4'
          }`}
          style={{ width: atBottom ? groupWidth : '' }}
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
                icon={<Right className="w-4 h-4 " />}
                className="flex items-center"
              >
                任务
              </Button>
            </div>
            <div className="p-1">
              <Button type="text" className="mr-1" onClick={cancel}>
                取消
              </Button>
              <Button type="primary" onClick={submit}>
                确认
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {canEdit && (
            <Button
              icon={<PlusOutlined />}
              style={{ width: taskWidth, marginLeft: groupPadding }}
              onClick={() => {
                setShowAdd(true)
              }}
            >
              添加任务
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export default NewTaskItem
