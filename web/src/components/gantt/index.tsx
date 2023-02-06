import React, { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './calendar/calendar'

import { ganttDateRange, seedDates } from './utils/date'
import HorizontalScroll from './scrollbar/scroll'
import { convertToGanttTaks, loadBarInfo } from './utils/task'
import ViewModeSwither from './viewmodeSwitcher'
import { tasks } from './data'
import Bars from './taskbar/bars'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import TaskTable from './task-table'
import { setDates, setTasks } from '../../reducers/ganttSlice'

interface Props {}

const Gantt: React.FC<Props> = ({}) => {
  const { viewMode, totalWidth, rowCount, dates } = useAppSelector(
    (s) => s.gantt
  )

  const taskGroups = useAppSelector((s) => s.project.taskGroups)

  useEffect(() => {
    let { tasks, start, end } = convertToGanttTaks(taskGroups)

    console.log(tasks, start, end)
  }, [taskGroups])

  const dispatch = useAppDispatch()

  useEffect(() => {
    const [startDate, endDate] = ganttDateRange(tasks, viewMode)
    let dates = seedDates(startDate, endDate, viewMode)
    dispatch(setDates(dates))

    let ts = loadBarInfo(tasks, dates, viewMode)

    dispatch(setTasks(ts))
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
          <Bars />
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
