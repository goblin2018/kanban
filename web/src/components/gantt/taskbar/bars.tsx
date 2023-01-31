import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useRef, useState } from 'react'
import { setDiffX, setHold } from '../ganttSlice'
import Grid from '../grid/grid'
import { rowHeight } from '../utils/conf'

import TaskItem from './taskbar'
// TODO 扁平化 列表 并处理时间问题

const Bars = () => {
  const { tasks, hold, totalWidth, rowCount } = useAppSelector((s) => s.gantt)
  const dispatch = useAppDispatch()
  const [startX, setStartX] = useState(0)

  const barContainerRef = useRef<SVGSVGElement>(null)

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

  return (
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
        {tasks &&
          tasks.map((task, i) => {
            return (
              <g key={`outer-${i}`}>
                <TaskItem key={`taskItem-${task.index}`} task={task} />
                {task.children &&
                  task.children.map((tc) => (
                    <TaskItem key={`taskItem-${tc.index}`} task={tc} />
                  ))}
              </g>
            )
          })}
      </g>
    </svg>
  )
}

export default Bars
