import { DatePicker, Form, Input, Drawer, Radio, Divider, Button } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { closeEditModal, setCurrentTask } from '../../../reducers/taskSlice'

import { Task, updateTask } from 'api/task'
import { dayjsToStr, strToDayjs } from 'api/utils'
import { setCurrentProject } from 'reducers/projectSlice'

const { Item } = Form

const EditTaskModal = () => {
  const open = useAppSelector((s) => s.task.editModalOpen!)
  const { current: task, groupIdx, taskIdx } = useAppSelector((s) => s.task)
  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()

  const [tForm] = Form.useForm()

  const cancel = () => dispatch(closeEditModal())

  useEffect(() => {
    if (open) {
      let t = { ...task }

      let startAt = strToDayjs(t.startAt)
      let endAt = strToDayjs(t.endAt)

      tForm.setFieldsValue({ ...t, startAt: startAt, endAt: endAt })
    }
  }, [open])

  const submit = () => {
    let t = tForm.getFieldsValue()

    let newTask: Task = { id: task?.id }
    newTask.name = t.name == '' ? task?.name : t.name
    newTask.startAt = t.startAt
    newTask.endAt = t.endAt

    if (
      newTask.name == task?.name &&
      newTask.startAt == task?.startAt &&
      newTask.endAt == task?.endAt
    ) {
      return
    }

    updateTask(newTask)
      .then((res) => {
        let nt = { ...task, ...newTask }
        dispatch(setCurrentTask(nt))

        let p = { ...project }
        let groups = [...p.taskGroups!]
        let g = { ...groups[groupIdx!] }
        let tasks = [...g.tasks!]
        tasks[taskIdx!] = nt

        g.tasks = tasks
        groups[groupIdx!] = g
        p.taskGroups = groups
        dispatch(setCurrentProject(p))
      })
      .finally(() => {
        cancel()
      })
  }

  return (
    <Drawer
      title={'编辑任务'}
      open={open}
      onClose={cancel}
      width={768}
      footer={
        <div>
          <Button type="primary" className="mr-4">
            确认
          </Button>
          <Button>取消</Button>
        </div>
      }
    >
      <div className="flex">
        <div className='w-[300px]'>
          <div className="mb-4">任务详情</div>
          <Form form={tForm}>
            <Item label={'项目名称'} name="name">
              <Input />
            </Item>
            <Item label="开始时间" name="startAt">
              <DatePicker></DatePicker>
            </Item>
            <Item label="结束时间" name="endAt">
              <DatePicker></DatePicker>
            </Item>
          </Form>
        </div>
        <div className='bg-slate-300 w-px mx-2'></div>
        <div className="flex-1">
          <div className="mb-4">评论</div>
        </div>
      </div>
    </Drawer>
  )
}

export default EditTaskModal
