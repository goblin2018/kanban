import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useRef, useState } from 'react'
import { setDiffX, setHold } from '../ganttSlice'
import Grid from '../grid/grid'
import { ColumnWidthConf, rowHeight, StepWidth } from '../utils/conf'
import { getDaysInMonth, xToDate } from '../utils/date'
import { isRun } from '../utils/task'
import { ViewMode } from '../utils/types'

import TaskItem from './taskbar'
// TODO 扁平化 列表 并处理时间问题

const Bars = () => {
  const { tasks, hold, totalWidth, rowCount, diffX, viewMode, dates } =
    useAppSelector((s) => s.gantt)
  const dispatch = useAppDispatch()
  const [startX, setStartX] = useState(0)

  const barContainerRef = useRef<SVGSVGElement>(null)

  const [dayStepX, setDayStepX] = useState(65)

  const [dateInfo, setDateInfo] = useState(new Date())

  const onMove = (e: MouseEvent) => {
    console.log('onmove', e.clientX)

    dispatch(setDiffX(e.clientX - startX))
  }

  useEffect(() => {
    if (hold != -1) {
      barContainerRef.current?.addEventListener('mousemove', onMove)
    } else {
      barContainerRef.current?.removeEventListener('mousemove', onMove)
      setStartX(0)
      setDiffX(0)
    }
  }, [hold])

  const dateLabelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let label = dateLabelRef.current
    if (!label) {
      return
    }
    if (hold == -1) {
      label.style.display = 'none'
    } else {
      label.style.display = ''
      label.style.left = tasks[hold].barInfo!.x2! + diffX - 40 + 'px'
      label.style.top = tasks[hold].barInfo!.y! - 30 + 'px'
      setDateInfo(xToDate(tasks[hold].barInfo!.x2! + diffX, dates[0], viewMode))
    }
  }, [hold, diffX])

  return (
    <div className="relative">
      <svg
        ref={barContainerRef}
        xmlns="http://www.w3.org/2000/svg"
        width={totalWidth}
        height={rowCount * rowHeight}
        // fontFamily={barProps.fontFamily}

        onMouseDown={(e) => {
          setStartX(e.clientX)
        }}
        onMouseUp={(e) => {
          dispatch(setHold(-1))
        }}
        onMouseLeave={(e) => {
          if (e.target == barContainerRef.current) {
            dispatch(setHold(-1))
          }
        }}
      >
        <Grid />

        <g className="bar">
          {tasks.map((task, i) => {
            return <TaskItem key={`taskItem-${task.index}`} task={task} />
          })}
        </g>
      </svg>

      <div
        ref={dateLabelRef}
        style={{
          position: 'absolute',
        }}
      >
        {`${(dateInfo.getMonth() + 1).toString().padStart(2, '0')}-${dateInfo
          .getDate()
          .toString()
          .padStart(2, '0')}`}
      </div>
    </div>
  )
}

export default Bars
