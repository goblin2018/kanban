import React, { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './calendar/calendar'
import {
  headerHeight,
  preStepsCount,
  rowHeight,
  taskHeight,
} from './utils/conf'
import Content from './content'
import { ganttDateRange, seedDates } from './utils/date'
import Grid from './grid/grid'
import HorizontalScroll from './scrollbar/scroll'
import { convertToBarTasks, removeHiddenTasks, sortTask } from './utils/task'
import { BarTask, DateSetup, Task, ViewMode } from './utils/types'
import TaskItem from './taskbar/taskbar'

let tasks: Task[] = [
  {
    id: '1',
    type: 'project',
    name: 'p1',
    start: new Date(2023, 0, 1),
    end: new Date(2023, 0, 10),
    progress: 10,
  },
  {
    id: '4',
    type: 'task',
    name: 't4这个任务很长啊',
    start: new Date(2023, 0, 2),
    end: new Date(2023, 0, 3),
    progress: 10,
  },
  {
    id: '3',
    type: 'task',
    name: 't3',
    start: new Date(2023, 0, 1),
    end: new Date(2023, 0, 10),
    progress: 10,
  },
  {
    id: '2',
    type: 'project',
    name: 'p2',
    start: new Date(2023, 1, 1),
    end: new Date(2023, 1, 10),
    progress: 10,
  },
]

interface Props {}

const Gantt: React.FC<Props> = ({}) => {
  const [onExpanderClick, setOnExpanderClick] = useState(false)

  const [barTasks, setBarTasks] = useState<BarTask[]>([])

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day)
  const columnWidth = useMemo(() => {
    switch (viewMode) {
      case ViewMode.Year:
        return 350
      case ViewMode.Month:
        return 300
      case ViewMode.Week:
        return 250
      default:
        return 65
    }
  }, [viewMode])

  useEffect(() => {
    let filteredTasks: Task[]
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks)
    } else {
      filteredTasks = tasks
    }
    filteredTasks = filteredTasks.sort(sortTask)

    const [startDate, endDate] = ganttDateRange(filteredTasks, viewMode)

    let newDates = seedDates(startDate, endDate, viewMode)
    setDateSetup({ dates: newDates, viewMode: viewMode })

    setBarTasks(convertToBarTasks(filteredTasks, newDates, columnWidth))
  }, [viewMode])

  const [dateSetup, setDateSetup] = useState<DateSetup>({
    dates: [],
    viewMode: viewMode,
  })

  const svgWidth = dateSetup.dates.length * columnWidth
  const svgHeight = tasks.length * rowHeight

  const ganttContainerRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  useEffect(() => {
    console.log('scrollLeft is ', scrollLeft)

    if (ganttContainerRef.current) {
      ganttContainerRef.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <div className="mx-4 my-8">
      this is gantt
      <div className="flex w-full">
        <div className="w-[300px] flex-shrink-0">
          <div
            className="flex items-end justify-between"
            style={{ height: headerHeight }}
          >
            <div>任务名称</div>
            <div>开始时间</div>
            <div>结束时间</div>
          </div>
          {tasks.map((t) => (
            <div
              key={`taskname-${t.id}`}
              className="flex items-center justify-between"
              style={{ height: rowHeight }}
            >
              <div>{t.name}</div>
              <div>{t.start.toLocaleDateString()}</div>
              <div>{t.end.toLocaleDateString()}</div>
            </div>
          ))}
        </div>

        <div
          className="flex-1 overflow-hidden"
          ref={ganttContainerRef}
          onWheel={(e) => {
            console.log(e.deltaY)
            let nl = scrollLeft + e.deltaY
            if (nl <= 0) {
              nl = 0
            } else if (
              nl + ganttContainerRef.current!.clientWidth >=
              svgWidth
            ) {
              nl = svgWidth - ganttContainerRef.current!.clientWidth
            }
            setScrollLeft(nl)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgWidth}
            height={headerHeight}
            // fontFamily={barProps.fontFamily}
          >
            <Calendar
              viewMode={viewMode}
              dateSetup={dateSetup}
              locale={'zh-CN'}
              headerHeight={headerHeight}
              columnWidth={columnWidth}
            />
          </svg>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={svgWidth}
              height={svgHeight}
              // fontFamily={barProps.fontFamily}
            >
              <Grid
                tasks={tasks}
                dates={dateSetup.dates}
                svgWidth={svgWidth}
                rowHeight={rowHeight}
                columnWidth={columnWidth}
                todayColor={'rgba(252, 248, 227, 0.5)'}
              />
              {dateSetup.dates.length > 0 ? (
                <g className="bar">
                  {barTasks.map((task) => {
                    return <TaskItem key={`taskItem-${task.id}`} task={task} />
                  })}
                </g>
              ) : null}
            </svg>
          </div>
        </div>
      </div>
      {ganttContainerRef.current && (
        <HorizontalScroll
          svgWidth={svgWidth}
          scroll={scrollLeft}
          taskListWidth={300}
          width={ganttContainerRef.current?.clientWidth}
          setScroll={setScrollLeft}
        />
      )}
    </div>
  )
}

export default Gantt
