import {
  DatePicker,
  Form,
  Input,
  Drawer,
  Button,
  Popconfirm,
  Radio,
} from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useState } from 'react'
import { closeTaskDrawer, setCurrentTask } from '../../../reducers/taskSlice'

import { delTask, Task, updateTask } from 'api/task'
import { strToDayjs, toShortDate } from 'api/utils'
import { setTaskGroups } from 'reducers/projectSlice'
import Comments from './comments'
import { ProjectStatus, ProjectStatusInfo } from 'api/constatns'
import { DeleteOutlined } from '@ant-design/icons'

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

  const cancel = () => {
    dispatch(closeTaskDrawer())
  }

  useEffect(() => {
    if (open) {
      setChanged(false)
      let t = { ...task }

      let startAt = strToDayjs(t.startAt)
      let endAt = strToDayjs(t.endAt)

      console.log('get task ', t)

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
    newTask.status = t.status
    if (
      newTask.name == task?.name &&
      toShortDate(newTask.startAt) == toShortDate(task?.startAt) &&
      toShortDate(newTask.endAt) == toShortDate(task?.endAt) &&
      newTask.desc == task?.desc &&
      newTask.status == task?.status
    ) {
      return
    }

    console.log('new task ', newTask)

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

  const submitDelete = () => {
    delTask(task!)
      .then((res) => {
        //
        let groups = [...taskGroups]
        let g = { ...groups[groupIdx!] }
        let tasks = [...g.tasks!]
        tasks.splice(taskIdx!, 1)

        g.tasks = tasks
        groups[groupIdx!] = g
        dispatch(setTaskGroups(groups))
      })
      .finally(() => {
        cancel()
      })
  }

  const [changed, setChanged] = useState(false)

  return (
    <Drawer title={'编辑任务'} open={open} onClose={cancel} width={768}>
      <div className="flex h-full">
        <div className="w-[300px] relative">
          <div className="mb-4 text-text-disabled">任务详情</div>
          <Form
            form={tForm}
            layout="vertical"
            onValuesChange={(e) => setChanged(true)}
          >
            <Item label={'任务名称'} name="name">
              <Input />
            </Item>

            <Item label="当前状态" name={'status'} className="inline-block">
              <Radio.Group>
                <Radio.Button value={ProjectStatus.NotStart}>
                  {ProjectStatusInfo[ProjectStatus.NotStart].info}
                </Radio.Button>
                <Radio.Button value={ProjectStatus.On}>
                  {ProjectStatusInfo[ProjectStatus.On].info}
                </Radio.Button>
                <Radio.Button value={ProjectStatus.Done}>
                  {ProjectStatusInfo[ProjectStatus.Done].info}
                </Radio.Button>
              </Radio.Group>
            </Item>
            <Item label="开始时间" name="startAt">
              <DatePicker></DatePicker>
            </Item>
            <Item label="结束时间" name="endAt">
              <DatePicker></DatePicker>
            </Item>
            <Item label="任务描述" name={'desc'}>
              <Input.TextArea />
            </Item>
          </Form>

          <div className={`flex justify-end ${changed ? '' : 'hidden'}`}>
            <Button className="mr-4" onClick={() => setChanged(false)}>
              取消
            </Button>
            <Button type="primary" className="" onClick={submitEdit}>
              确认
            </Button>
          </div>
          <Popconfirm
            title="确定删除任务？"
            onConfirm={submitDelete}
            className="absolute bottom-0"
          >
            <Button danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
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
