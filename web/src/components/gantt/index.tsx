import React, { useEffect, useMemo, useRef, useState } from 'react'
import Calendar from './calendar/calendar'

import { seedDates } from './utils/date'
import HorizontalScroll from './scrollbar/scroll'
import { convertToGanttTaks, loadBarInfo } from './utils/task'
import Bars from './taskbar/bars'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import TaskTable from './task-table'
import {
  setDates,
  setScrollLeft,
  setScrollTop,
  setTasks,
} from 'reducers/ganttSlice'
import { tableWidth } from './utils/conf'

interface Props {}

const Gantt: React.FC<Props> = ({}) => {
  const { viewMode, totalWidth, scrollLeft } = useAppSelector((s) => s.gantt)

  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  let { tasks, start, end } = convertToGanttTaks(taskGroups)

  useEffect(() => {
    dispatch(setScrollTop(0))
  }, [])

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
    <div className="h-full">
      <div className="flex h-full w-full max-h-full  relative overflow-hidden">
        <div className=" flex-shrink-0 h-full" style={{ width: tableWidth }}>
          <TaskTable />
        </div>

        <div
          className="flex-1 relative scrollbar-thin scrollbar-thumb-blue-200 
         scrollbar-thumb-rounded-full
         scrollbar-track-blue-50 mr-6 pb-2"
          ref={ganttContainerRef}
          onScroll={(e) => {
            dispatch(setScrollTop(e.currentTarget.scrollTop))
            dispatch(setScrollLeft(e.currentTarget.scrollLeft))
          }}
          // onWheel={(e) => {
          //   if (!e.shiftKey) {
          //     return
          //   }
          //   let nl = scrollLeft + e.deltaY
          //   if (nl <= 0) {
          //     nl = 0
          //   } else if (
          //     nl + ganttContainerRef.current!.clientWidth >=
          //     totalWidth
          //   ) {
          //     nl = totalWidth - ganttContainerRef.current!.clientWidth
          //   }
          //   dispatch(setScrollLeft(nl))
          // }}
        >
          <Calendar />
          <Bars />
        </div>
      </div>
    </div>
  )
}

export default Gantt
