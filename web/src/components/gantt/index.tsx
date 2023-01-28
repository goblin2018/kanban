import React, { useEffect, useState } from 'react'
import Calendar from './calendar'
import { removeHiddenTasks, sortTask } from './task'
import { Task, ViewMode } from './types'

let tasks: Task[] = []

const Gantt = () => {
  const [onExpanderClick, setOnExpanderClick] = useState(false)
  useEffect(() => {
    let filteredTasks: Task[]
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks)
    } else {
      filteredTasks = tasks
    }
    filteredTasks = filteredTasks.sort(sortTask)
  }, [])

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
            // dateSetup={undefined}
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
