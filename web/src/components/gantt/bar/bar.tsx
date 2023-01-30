import { barBackgroundColor, barBackgroundSelectedColor, barCornerRadius, taskHeight } from '../conf'
import { BarTask } from '../types'
import BarDisplay from './bar-display'
import styles from './bar.module.css'
import DateHandle from './date-handle'
interface Props {
  task: BarTask
  isSelected: boolean
}

const Bar: React.FC<Props> = ({ task, isSelected }) => {
  const progressPoint = getProgressPoint(
    task.progressWidth + task.progressX,
    task.y,
    task.height
  )

  const handleHeight = task.height - 2

  const getBarColor = () => {
    return isSelected ? barBackgroundSelectedColor : barBackgroundColor
  }

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <rect
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={taskHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={styles.barBackground}
      />

      <g className="hanldeGroup">
        {/* left */}
        <DateHandle
          x={task.x1 + 1}
          y={task.y + 1}
          width={task.handleWidth}
          height={handleHeight}
          barCornerRadius={task.barCornerRadius}
          onMouseDown={() => {}}
        />
        {/* right */}
        <DateHandle
          x={task.x2 - task.handleWidth - 1}
          y={task.y + 1}
          width={task.handleWidth}
          height={handleHeight}
          barCornerRadius={task.barCornerRadius}
          onMouseDown={() => {}}
        />
      </g>
    </g>
  )
}

export default Bar

const getProgressPoint = (
  progressX: number,
  taskY: number,
  taskHeight: number
) => {
  const point = [
    progressX - 5,
    taskY + taskHeight,
    progressX + 5,
    taskY + taskHeight,
    progressX,
    taskY + taskHeight - 8.66,
  ]
  return point.join(',')
}
