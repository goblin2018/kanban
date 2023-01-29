import React, { useEffect, useState } from 'react'
import Calendar from './calendar'
import { ganttDateRange, seedDates } from './date'
import Grid from './grid'
import { removeHiddenTasks, sortTask } from './task'
import { DateSetup, Task, ViewMode } from './types'

let tasks: Task[] = [
  {
    id: '1',
    type: 'project',
    name: 'p1',
    start: new Date(2022, 1, 1),
    end: new Date(2022, 1, 10),
    progress: 10,
  },
  {
    id: '2',
    type: 'project',
    name: 'p2',
    start: new Date(2022, 1, 1),
    end: new Date(2022, 1, 10),
    progress: 10,
  },
]

interface Props {
  viewMode?: ViewMode
  preStepsCount?: number
}

const Gantt: React.FC<Props> = ({
  viewMode = ViewMode.Day,
  preStepsCount = 1,
}) => {
  const [onExpanderClick, setOnExpanderClick] = useState(false)
  useEffect(() => {
    let filteredTasks: Task[]
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks)
    } else {
      filteredTasks = tasks
    }
    filteredTasks = filteredTasks.sort(sortTask)

    const [startDate, endDate] = ganttDateRange(
      filteredTasks,
      viewMode,
      preStepsCount
    )

    let newDates = seedDates(startDate, endDate, viewMode)
    setDateSetup({ dates: newDates, viewMode: viewMode })
  }, [viewMode, preStepsCount])

  const [dateSetup, setDateSetup] = useState<DateSetup>({
    dates: [],
    viewMode: viewMode,
  })

  return (
    <>
      this is gantt
      <div className="flex">
        <div className="w-48">
          <div>任务名称</div>
          {tasks.map((t) => (
            <div key={`taskname-${t.id}`}>{t.name}</div>
          ))}
        </div>

        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // width={900}
            height={200}
            // fontFamily={barProps.fontFamily}
          >
            <Calendar
              viewMode={viewMode}
              dateSetup={dateSetup}
              locale={'zh-CN'}
              headerHeight={20}
              columnWidth={50}
            />
          </svg>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              // width={900}
              height={200}
              // fontFamily={barProps.fontFamily}
            >
              <Grid
                tasks={tasks}
                dates={dateSetup.dates}
                svgWidth={900}
                rowHeight={40}
                columnWidth={50}
                todayColor={'rgba(252, 248, 227, 0.5)'}
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gantt
