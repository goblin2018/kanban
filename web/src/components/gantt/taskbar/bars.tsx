import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useRef, useState } from 'react'
import { setDiffX, setHold } from '../ganttSlice'

import TaskItem from './taskbar'

const Bars = () => {
  const { tasks, hold } = useAppSelector((s) => s.gantt)
  const dispatch = useAppDispatch()
  const [startX, setStartX] = useState(0)

  const barContainerRef = useRef<SVGGElement>(null)

  const onMove = (e: MouseEvent) => {
    dispatch(setDiffX(e.clientX - startX))
  }

  useEffect(() => {
    if (hold != -1) {
      barContainerRef.current?.addEventListener('mousemove', onMove)
    } else {
      barContainerRef.current?.removeEventListener('mousemove', onMove)
      setStartX(0)
    }

    return () => {
      barContainerRef.current?.removeEventListener('mousemove', onMove)
      setStartX(0)
    }
  }, [hold])

  return (
    <g
      ref={barContainerRef}
      className="bar"
      onMouseDown={(e) => {
        setStartX(e.clientX)
      }}
      onMouseUp={(e) => {
        dispatch(setHold(-1))
      }}
      onMouseLeave={(e) => {
        dispatch(setHold(-1))
      }}
    >
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
  )
}

export default Bars
