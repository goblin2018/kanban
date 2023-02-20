import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  listProjects,
  setProjectItems,
  setProjectModalState,
} from '../../reducers/projectSlice'
import {
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Select,
} from 'antd'
import { addProject, Project, updateProject } from 'api/project'
import dayjs from 'dayjs'
import { ErrCode, ProjectStatus, ProjectStatusInfo } from 'api/constatns'
import { listUsers, User, UserLevel } from 'api/user'
import { toShortDate } from 'api/utils'
import UserTag from 'components/userTag'

const { Item } = Form
const ProjectModal = () => {
  const {
    projectModalState: status,
    current: project,
    items,
  } = useAppSelector((s) => s.project)

  const user = useAppSelector((s) => s.user.my)
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(setProjectModalState('close'))
  }

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (user?.level == UserLevel.Admin) {
      listUsers({ all: true }).then((res) => {
        let items = res.data.items ? res.data.items : []
        setUsers(items)
      })
    }
  }, [user?.level])

  useEffect(() => {
    if (status == 'edit') {
      if (user?.level == UserLevel.Normal) {
        setUsers([{ ...project.owner }])
      }
      let pdate: dayjs.Dayjs[] = []
      if (project.startAt) {
        pdate = [dayjs(project.startAt), dayjs(project.endAt)]
      }
      aForm.setFieldsValue({ ...project, pdate })
    } else if (status == 'add') {
      aForm.resetFields()
      if (user?.level == UserLevel.Normal) {
        setUsers([{ ...user }])
      }
      aForm.setFieldsValue({
        status: ProjectStatus.NotStart,
        ownerId: user?.id,
      })
    }
  }, [status])

  const [aForm] = Form.useForm()

  const submit = () => {
    let newP = aForm.getFieldsValue()
    let pdate = newP.pdate
    if (pdate) {
      let startAt = pdate[0] as dayjs.Dayjs
      newP.startAt = startAt

      let endAt = pdate[1] as dayjs.Dayjs
      newP.endAt = endAt
    }
    if (status == 'add') {
      // 添加项目

      addProject(newP).then((res) => {
        console.log(res)

        if (res.code == 200) {
          message.info('创建项目成功')
          cancel()
          dispatch(listProjects())
        } else {
          message.warning('创建项目失败，存在同名项目 ' + newP.name)
        }
      })
    } else {
      // 编辑项目
      newP.id = project?.id
      let np = newP as Project

      if (
        np.name == project?.name &&
        np.ownerId == project?.ownerId &&
        toShortDate(np.startAt) == toShortDate(project?.startAt) &&
        toShortDate(np.endAt) == toShortDate(project?.endAt) &&
        np.desc == project?.desc
      ) {
        return
      }
      updateProject(np).then((res) => {
        switch (res.code) {
          case ErrCode.Forbidden:
            notification.warning({ message: '无操作全权限' })
            break
          case ErrCode.Ok:
            let its = [...items]
            let idx = its.findIndex((v) => v.id == project.id)
            its[idx] = { ...project, ...np }
            dispatch(setProjectItems(its))
            cancel()
            notification.success({
              message: '操作成功',
              description: '修改项目信息成功',
            })
            break
        }
      })
    }
  }

  return (
    <>
      <Modal
        open={status != 'close'}
        title={`${status == 'add' ? '创建' : '编辑'}项目`}
        onCancel={cancel}
        onOk={submit}
      >
        <Form form={aForm} layout="vertical">
          <Item label="名称" name={'name'}>
            <Input size="large" />
          </Item>
          <Item label="当前状态" name={'status'}>
            <Radio.Group size="large">
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

          <Item label="负责人" name="ownerId" className="w-52">
            <Select size="large">
              {users.map((u, i) => (
                <Select.Option key={`user-${i}`} value={u.id}>
                  <UserTag user={u} />
                </Select.Option>
              ))}
            </Select>
          </Item>

          <Item label="项目日期" name={'pdate'}>
            <DatePicker.RangePicker size="large" />
          </Item>
          {/* <Item label="结束时间" name={'start'}>
            <DatePicker />
          </Item>
          <Item name={'end'}>
            <DatePicker />
          </Item> */}

          <Item label="项目描述" name="desc">
            <Input.TextArea />
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default ProjectModal
