import { Radio } from 'antd'
import React from 'react'
import { ViewMode } from './utils/types'

interface Props {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewModeSwither: React.FC<Props> = ({ viewMode, setViewMode }) => {
  return (
    <div className="absolute right-4">
      <Radio.Group
        defaultValue={ViewMode.Day}
        buttonStyle="solid"
        value={viewMode}
        onChange={(e) => {
          setViewMode(e.target.value)
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
