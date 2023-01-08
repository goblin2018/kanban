import React from 'react'
import Calendar from './calendar'
import { ViewMode } from './types'

const Gantt = () => {
  return (
    <>
      this is gantt
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // width={gridProps.svgWidth}
          // height={calendarProps.headerHeight}
          // fontFamily={barProps.fontFamily}
        >
          <Calendar
            viewMode={ViewMode.Day}
            dateSetup={undefined}
            locale={''}
            headerHeight={0}
            columnWidth={50}
          />
        </svg>
      </div>
    </>
  )
}

export default Gantt
