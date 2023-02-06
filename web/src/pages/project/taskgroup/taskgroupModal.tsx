import { Drawer, Input, Modal } from 'antd'
import { addTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  setCurrentProject,
  setTaskGroupModalState,
  setTaskGroups,
} from 'reducers/projectSlice'
import { useState } from 'react'

const TaskGroupModal = () => {
  const {
    taskGroupModalState: state,
    taskGroups,
    current: project,
  } = useAppSelector((s) => s.project)
  const dispatch = useAppDispatch()

  const cancel = () => {
    dispatch(setTaskGroupModalState('close'))
  }
  const submit = () => {
    if (name == '') {
      return
    }
    addTaskGroup({ projectId: project.id, name: name })
      .then((res) => {
        // 获取任务列表
        let tgs = [...taskGroups]
        tgs.push({ ...res.data, projectId: project.id, name: name })
        dispatch(setTaskGroups(tgs))
      })
      .finally(() => {
        setName('')
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
