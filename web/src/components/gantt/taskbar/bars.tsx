import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { setDiffX, setHold } from 'reducers/ganttSlice'
import Grid from '../grid/grid'
import { rowHeight, StepWidth } from '../utils/conf'
import Project from './project/project'
import Bar from './task/bar'

const Bars = () => {
  const { tasks, hold, totalWidth, rowCount, diffX } = useAppSelector(
    (s) => s.gantt
  )
  const dispatch = useAppDispatch()
  const [startX, setStartX] = useState(0)

  const barContainerRef = useRef<SVGSVGElement>(null)

  const onMove = useCallback(
    (e: MouseEvent) => {
      if (startX == 0) {
        return
      }

      console.log('move ', e.clientX - startX)
      dispatch(setDiffX(e.clientX - startX))
    },
    [startX]
  )
  useEffect(() => {
    if (hold.index != -1) {
      barContainerRef.current?.addEventListener('mousemove', onMove)
    } else {
      barContainerRef.current?.removeEventListener('mousemove', onMove)
      setStartX(0)
    }
  }, [hold])

  const onMoveDone = () => {
    dispatch(setHold({ reset: true }))
  }

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
          console.log('mouse up ')

          onMoveDone()
        }}
        onMouseLeave={(e) => {
          console.log('mouse leave')

          onMoveDone()
        }}
      >
        <Grid />

        <g className="bar">
          {tasks.map((task, i) => {
            if (task.start) {
              return (
                <g
                  key={`taskItem-${task.index}`}
                  onKeyDown={(e) => {
                    e.stopPropagation()
                    switch (e.key) {
                      case 'Delete': {
                        break
                      }
                    }
                  }}
                  onMouseEnter={(e) => {}}
                  onMouseLeave={(e) => {}}
                  onClick={(e) => {
                    // TODO 增加点击逻辑
                    console.log('click item ', task.name)
                  }}
                >
                  {task.type == 'project' ? (
                    <Project task={task} isSeleceted={false} />
                  ) : (
                    <Bar task={task} isSelected={false} />
                  )}
                </g>
              )
            }

            return <g key={`taskItem-${task.index}`}></g>
          })}
        </g>
      </svg>
    </div>
  )
}

export default Bars
