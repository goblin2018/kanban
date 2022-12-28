import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { closeAddModal, listProjects } from './projectSlice'
import { DatePicker, Form, Input, message, Modal, Radio, Select } from 'antd'
import { addProject } from 'api/project'
import dayjs from 'dayjs'

const { Item } = Form
const AddModal = () => {
  const status = useAppSelector((s) => s.project.addModalState)
  const dispatch = useAppDispatch()
  const handleClose = () => {
    dispatch(closeAddModal())
  }

  const [aForm] = Form.useForm()

  const submit = () => {
    if (status == 'add') {
      // 添加项目
      let newP = aForm.getFieldsValue()

      console.log(newP)

      let pdate = newP.pdate
      console.log(pdate)

      if (pdate) {
        let startAt = pdate[0] as dayjs.Dayjs
        newP.startAt = startAt

        let endAt = pdate[1] as dayjs.Dayjs
        newP.endAt = endAt
      }

      console.log(newP)

      addProject(newP).then((res) => {
        console.log(res)

        if (res.code == 200) {
          message.info('创建项目成功')
          dispatch(closeAddModal())
          dispatch(listProjects())
        } else {
          message.warning('创建项目失败，存在同名项目 ' + newP.name)
        }
      })
    }
  }

  return (
    <>
      <Modal
        open={status != 'close'}
        title={`创建项目`}
        onCancel={handleClose}
        onOk={submit}
      >
        <Form form={aForm}>
          <Item label="当前状态" name={'status'}>
            <Radio.Group>
              <Radio.Button>未开始</Radio.Button>
              <Radio.Button>进行中</Radio.Button>
              <Radio.Button>已完成</Radio.Button>
            </Radio.Group>
          </Item>
          <Item label="名称" name={'name'}>
            <Input />
          </Item>
          <Item label="项目日期" name={'pdate'}>
            <DatePicker.RangePicker />
          </Item>
          {/* <Item label="结束时间" name={'start'}>
            <DatePicker />
          </Item>
          <Item name={'end'}>
            <DatePicker />
          </Item> */}
          <Item label="项目描述">
            <Input.TextArea />
          </Item>
          <Item label="负责人">
            <Select></Select>
          </Item>
        </Form>
      </Modal>
    </>
  )
}

export default AddModal
