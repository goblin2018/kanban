import { Drawer, Input, Modal } from 'antd'
import { addTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  setCurrentProject,
  setTaskGroupModalState,
  setTaskGroups,
} from 'reducers/projectSlice'
import { useState } from 'react'
import { CirclePicker, Color } from 'react-color'

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

  const [color, setColor] = useState<Color>(
    // taskgroup.color!
    '#aabbcc'
  )

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

  const [name, setName] = useState('')
  return (
    <Modal
      open={state != 'close'}
      title={'添加任务组'}
      onCancel={cancel}
      onOk={submit}
    >
      <div className="mb-1">任务组名称</div>
      <Input
        value={name}
        size="large"
        placeholder={'请输入任务组的名称'}
        onChange={(e) => {
          let v = e.target.value
          setName(v.trim())
        }}
        onPressEnter={submit}
      />

      <div>选择主题色</div>
      <CirclePicker
        color={color}
        onChange={(c, e) => {
          setColor(c.hex)
          submitColor(c.hex)
        }}
      />
    </Modal>
  )
}

export default TaskGroupModal
