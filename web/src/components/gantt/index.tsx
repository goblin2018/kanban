import React, { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './calendar/calendar'

import { seedDates } from './utils/date'
import HorizontalScroll from './scrollbar/scroll'
import { convertToGanttTaks, loadBarInfo } from './utils/task'
import ViewModeSwither from './viewmodeSwitcher'
import Bars from './taskbar/bars'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import TaskTable from './task-table'
import { setDates, setScrollLeft, setTasks } from 'reducers/ganttSlice'

interface Props {}

const Gantt: React.FC<Props> = ({}) => {
  const { viewMode, totalWidth, scrollLeft } = useAppSelector((s) => s.gantt)

  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  let { tasks, start, end } = convertToGanttTaks(taskGroups)

  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('start ', start.format())
    let dates = seedDates(start, end, viewMode)
    dispatch(setDates(dates))
    let ts = loadBarInfo(tasks, dates, viewMode)
    dispatch(setTasks(ts))
  }, [viewMode])

  const ganttContainerRef = useRef<HTMLDivElement>(null)
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
            dispatch(setScrollLeft(nl))
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
        />
      )}
    </div>
  )
}

export default Gantt
