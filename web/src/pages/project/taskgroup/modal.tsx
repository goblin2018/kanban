import { Drawer, Input, Modal } from 'antd'
import { addTaskGroup, updateTaskGroup } from 'api/taskgroup'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  setCurrentProject,
  setTaskGroupModalState,
  setTaskGroups,
} from 'reducers/projectSlice'
import { useEffect, useState } from 'react'
import { CirclePicker, Color } from 'react-color'

const TaskGroupModal = () => {
  const {
    taskGroupModalState: state,
    taskGroups,
    currentProject: project,
    currentTaskGroup: taskgroup,
  } = useAppSelector((s) => s.project)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (state == 'add') {
      setName('')
      setColor('#f44336')
    } else if (state == 'edit') {
      setName(taskgroup.name!)
      setColor(taskgroup.color!)
    }
  }, [state])

  const cancel = () => {
    dispatch(setTaskGroupModalState('close'))
  }
  const submit = () => {
    if (name == '') {
      return
    }

    if (state == 'add') {
      add()
    } else {
      update()
    }
    cancel()
  }

  const add = () => {
    addTaskGroup({ projectId: project.id, name: name, color: color })
      .then((res) => {
        // 获取任务列表
        let tgs = [...taskGroups]
        tgs.push({
          ...res.data,
          projectId: project.id,
          name: name,
          color: color,
        })
        dispatch(setTaskGroups(tgs))
      })
      .finally(() => {
        setName('')
      })
  }

  const [color, setColor] = useState<string>(taskgroup?.color || '#f44336')

  const update = () => {
    if ((taskgroup.name == name || name == '') && taskgroup.color == color) {
      return
    }
    updateTaskGroup({ id: taskgroup.id, name: name, color: color }).then(
      (res) => {
        // 更新名称
        let tgs = [...taskGroups]
        let i = tgs.findIndex((t) => t.id == taskgroup.id)
        tgs[i] = { ...tgs[i], name: name, color: color }
        dispatch(setTaskGroups(tgs))
      }
    )
  }

  const [name, setName] = useState('')
  return (
    <Modal
      open={state != 'close'}
      title={`${state == 'add' ? '添加' : '编辑'}任务组`}
      onCancel={cancel}
      onOk={submit}
    >
      <div className="mb-1">任务组名称</div>
      <Input
        value={name}
        placeholder={'请输入任务组的名称'}
        onChange={(e) => {
          let v = e.target.value
          setName(v.trim())
        }}
        onPressEnter={submit}
      />

      <div className="mt-6 mb-2">选择主题色</div>
      <CirclePicker
        color={color}
        onChange={(c, e) => {
          setColor(c.hex)
        }}
      />
    </Modal>
  )
}

export default TaskGroupModal
