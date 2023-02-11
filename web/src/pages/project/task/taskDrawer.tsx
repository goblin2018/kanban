import { DatePicker, Form, Input, Drawer, Button, Popconfirm } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { closeTaskDrawer, setCurrentTask } from '../../../reducers/taskSlice'

import { Task, updateTask } from 'api/task'
import { strToDayjs, toShortDate } from 'api/utils'
import { setTaskGroups } from 'reducers/projectSlice'
import Comments from './comments'

const { Item } = Form

const TaskDrawer = () => {
  const {
    current: task,
    groupIdx,
    taskIdx,
    taskDrawerOpen: open,
  } = useAppSelector((s) => s.task)
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const dispatch = useAppDispatch()

  const [tForm] = Form.useForm()

  const cancel = () => dispatch(closeTaskDrawer())

  useEffect(() => {
    if (open) {
      let t = { ...task }

      let startAt = strToDayjs(t.startAt)
      let endAt = strToDayjs(t.endAt)

      tForm.setFieldsValue({ ...t, startAt: startAt, endAt: endAt })
    }
  }, [open])

  const submitEdit = () => {
    let t = tForm.getFieldsValue()

    let newTask: Task = { id: task?.id }
    newTask.name = t.name == '' ? task?.name : t.name
    newTask.startAt = t.startAt
    newTask.endAt = t.endAt
    newTask.desc = t.desc == '' ? task?.desc : t.desc

    if (
      newTask.name == task?.name &&
      toShortDate(newTask.startAt) == toShortDate(task?.startAt) &&
      toShortDate(newTask.endAt) == toShortDate(task?.endAt) &&
      newTask.desc == task?.desc
    ) {
      return
    }

    updateTask(newTask)
      .then((res) => {
        let nt = { ...task, ...newTask }
        dispatch(setCurrentTask(nt))

        let groups = [...taskGroups]
        let g = { ...groups[groupIdx!] }
        let tasks = [...g.tasks!]
        tasks[taskIdx!] = nt

        g.tasks = tasks
        groups[groupIdx!] = g
        dispatch(setTaskGroups(groups))
      })
      .finally(() => {
        cancel()
      })
  }

  const submitDelete = () => {}

  return (
    <Drawer title={'编辑任务'} open={open} onClose={cancel} width={768}>
      <div className="flex h-full">
        <div className="w-[300px] relative">
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
            <Item label="项目描述" name={'desc'}>
              <Input.TextArea />
            </Item>
          </Form>

          <div className="absolute bottom-0">
            <Button type="primary" className="mr-4" onClick={submitEdit}>
              确认
            </Button>
            <Button className="mr-4" onClick={cancel}>
              取消
            </Button>
            <Popconfirm title="确定删除任务？" onConfirm={submitDelete}>
              <Button danger>删除</Button>
            </Popconfirm>
          </div>
        </div>
        <div className="bg-slate-200 w-px mx-2"></div>
        <div className="flex-1 relative">
          <Comments task={task!} />
        </div>
      </div>
    </Drawer>
  )
}

export default TaskDrawer
