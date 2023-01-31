import React, { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './calendar/calendar'
import {
  ColumnWidthConf,
  headerHeight,
  preStepsCount,
  rowHeight,
  taskHeight,
} from './utils/conf'
import { ganttDateRange, seedDates } from './utils/date'
import Grid from './grid/grid'
import HorizontalScroll from './scrollbar/scroll'
import { loadBarInfo } from './utils/task'
import { GanttTask, DateSetup, ViewMode } from './utils/types'
import TaskItem from './taskbar/taskbar'
import ViewModeSwither from './viewmodeSwitcher'
import { tasks } from './data'
import Bars from './taskbar/bars'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import TaskTable from './task-table'
import { setDates, setRowCount, setTasks } from './ganttSlice'

interface Props {}

const Gantt: React.FC<Props> = ({}) => {
  const { viewMode, totalWidth, rowCount, dates } = useAppSelector(
    (s) => s.gantt
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    const [startDate, endDate] = ganttDateRange(tasks, viewMode)
    let dates = seedDates(startDate, endDate, viewMode)
    dispatch(setDates(dates))

    let { tasks: ts, rowCount } = loadBarInfo(tasks, dates, viewMode)

    dispatch(setTasks(ts))
    dispatch(setRowCount(rowCount))
  }, [viewMode])

  const ganttContainerRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  useEffect(() => {
    if (ganttContainerRef.current) {
      ganttContainerRef.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <div className="mx-4 my-8">
      this is gantt
      <div className="flex w-full">
        <div className="w-[300px] flex-shrink-0">
          <TaskTable />
        </div>

        <div
          className="flex-1 overflow-hidden"
          ref={ganttContainerRef}
          onWheel={(e) => {
            if (!e.shiftKey) {
              return
            }
            let nl = scrollLeft + e.deltaY
            if (nl <= 0) {
              nl = 0
            } else if (
              nl + ganttContainerRef.current!.clientWidth >=
              totalWidth
            ) {
              nl = totalWidth - ganttContainerRef.current!.clientWidth
            }
            setScrollLeft(nl)
          }}
        >
          <ViewModeSwither />
          <Calendar />

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={totalWidth}
              height={rowCount * rowHeight}
              // fontFamily={barProps.fontFamily}

              onMouseMove={(e) => {
                // console.log('move ', e.clientX)
              }}
            >
              <Grid />
              <Bars />
            </svg>
          </div>
        </div>
      </div>
      {ganttContainerRef.current && (
        <HorizontalScroll
          taskListWidth={300}
          width={ganttContainerRef.current?.clientWidth}
          scroll={scrollLeft}
          setScroll={setScrollLeft}
        />
      )}
    </div>
  )
}

export default Gantt
