import { PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import { useState } from 'react'
import { ReactComponent as Right } from 'assets/right.svg'
import { addTask } from 'api/task'
import { TaskGroup } from 'api/taskgroup'

interface Props {
  taskgroup: TaskGroup
}

const NewTaskItem: React.FC<Props> = ({ taskgroup }) => {
  const [title, setTitle] = useState('')
  const [showAdd, setShowAdd] = useState(false)
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
      console.log(res.data)
    })
  }
  return (
    <>
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
    </>
  )
}

export default NewTaskItem
