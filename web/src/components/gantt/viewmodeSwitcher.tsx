import { Radio } from 'antd'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import React from 'react'
import { setViewMode } from '../../reducers/ganttSlice'
import { ViewMode } from './utils/types'

interface Props {}

const ViewModeSwither: React.FC<Props> = () => {
  const viewMode = useAppSelector((s) => s.gantt.viewMode)
  const dispatch = useAppDispatch()
  return (
    <div className="absolute right-4">
      <Radio.Group
        defaultValue={ViewMode.Day}
        buttonStyle="solid"
        value={viewMode}
        onChange={(e) => {
          dispatch(setViewMode(e.target.value))
        }}
      >
        <Radio.Button value={ViewMode.Day}>日</Radio.Button>
        <Radio.Button value={ViewMode.Week}>周</Radio.Button>
        <Radio.Button value={ViewMode.Month}>月</Radio.Button>
        <Radio.Button value={ViewMode.Year}>年</Radio.Button>
      </Radio.Group>
    </div>
  )
}

export default ViewModeSwither
