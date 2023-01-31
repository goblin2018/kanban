import { GanttTask } from 'components/gantt/utils/types'
import {
  barBackgroundColor,
  barBackgroundSelectedColor,
  barCornerRadius,
  handleWidth,
  taskHeight,
} from 'components/gantt/utils/conf'

import styles from './bar.module.css'
import DateHandle from './date-handle'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setHold } from 'components/gantt/ganttSlice'
interface Props {
  task: GanttTask
  isSelected: boolean
}

const Bar: React.FC<Props> = ({ task, isSelected }) => {
  const { diffX, hold } = useAppSelector((s) => s.gantt)
  const dispatch = useAppDispatch()
  const [isStart, setIsStart] = useState(false)

  const diff = useMemo(() => {
    return task.index == hold ? diffX : 0
  }, [hold, diffX])

  const setHoldPoint = (isStart: boolean) => {
    dispatch(setHold(task.index))
    setIsStart(isStart)
  }

  const getBarColor = () => {
    return isSelected ? barBackgroundSelectedColor : barBackgroundColor
  }

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <rect
        x={task.barInfo!.x1}
        y={task.barInfo!.y}
        width={task.barInfo!.x2! - task.barInfo!.x1! + diff}
        height={taskHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={styles.barBackground}
      />

      <g className="hanldeGroup">
        {/* left */}
        <DateHandle
          x={task.barInfo!.x1! + 1}
          y={task.barInfo!.y! + 1}
          setHold={() => setHoldPoint(true)}
        />
        {/* right */}
        <DateHandle
          x={task.barInfo!.x2! - handleWidth - 1}
          y={task.barInfo!.y! + 1}
          setHold={() => setHoldPoint(false)}
        />
      </g>
    </g>
  )
}

export default Bar
