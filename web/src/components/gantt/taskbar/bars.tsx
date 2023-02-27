import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback, useEffect, useRef, useState } from 'react'
import { setDiffX, setHold } from 'reducers/ganttSlice'
import { setEditTask } from 'reducers/taskSlice'
import Grid from '../grid/grid'
import { headerHeight, rowHeight } from '../utils/conf'
import Project from './project/project'
import Bar from './task/bar'

const Bars = () => {
  const { tasks, hold, totalWidth, rowCount, diffX } = useAppSelector(
    (s) => s.gantt
  )

  const { taskGroups, canEdit } = useAppSelector((s) => s.project)
  const dispatch = useAppDispatch()
  const [startX, setStartX] = useState(0)

  const barContainerRef = useRef<SVGSVGElement>(null)

  const onMove = useCallback(
    (e: MouseEvent) => {
      console.log('changed startX ', startX)

      if (startX == 0) {
        return
      }

      dispatch(setDiffX(e.clientX - startX))
    },
    [startX]
  )
  useEffect(() => {
    console.log('hold ', hold)

    if (hold.index && hold.index != -1) {
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
    <div className="relative" style={{ marginTop: headerHeight }}>
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
          let x = e.clientX
          let rec = barContainerRef.current!.getBoundingClientRect()
          if (x <= rec.left || x >= rec.right) {
            onMoveDone()
          }
        }}
      >
        <Grid />

        <g className="bar">
          {tasks
            .filter((t) => t.hide != true)
            .map((task, i) => {
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
                    onDoubleClick={(e) => {
                      // TODO 增加点击逻辑
                      console.log('click item ', task.name)

                      if (!canEdit) {
                        return
                      }

                      if (task.type == 'project') {
                        return
                      }

                      let idx = task.previousIndex
                      if (typeof idx == 'number') {
                        return
                      }
                      let pTask = { ...taskGroups[idx[0]].tasks![idx[1]] }
                      dispatch(
                        setEditTask({
                          task: pTask,
                          groupIdx: idx[0],
                          taskIdx: idx[1],
                        })
                      )
                    }}
                  >
                    {task.type == 'project' ? (
                      <Project task={task} isSeleceted={false} rowIdx={i} />
                    ) : (
                      <Bar task={task} isSelected={false} rowIdx={i} />
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
