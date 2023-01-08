import { Input, Modal } from 'antd'
import { addTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  closeTaskGroupModal,
  setCurrentProject,
} from 'pages/projects/projectSlice'
import { useState } from 'react'

const TaskGroupModal = () => {
  const state = useAppSelector((s) => s.project.taskGroupModalState)
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()

  const cancel = () => {
    dispatch(closeTaskGroupModal())
  }
  const submit = () => {
    if (name == '') {
      return
    }
    addTaskGroup({ projectId: project?.id, name: name }).then((res) => {
      // 获取任务列表

      let tmp = { ...project }
      console.log(tmp.taskGroups)

      if (!tmp.taskGroups) {
        tmp.taskGroups = []
      }
      tmp.taskGroups = [...tmp.taskGroups, res.data]
      dispatch(setCurrentProject(tmp))
    })
    cancel()
  }

  const [name, setName] = useState('')
  return (
    <Modal
      open={state != 'close'}
      title={'添加任务组'}
      onCancel={cancel}
      onOk={submit}
    >
      <Input
        value={name}
        placeholder={'请输入任务组的名称'}
        onChange={(e) => {
          let v = e.target.value
          setName(v.trim())
        }}
        onPressEnter={submit}
      />
    </Modal>
  )
}

export default TaskGroupModal
