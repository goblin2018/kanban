import { BarTask } from 'components/gantt/utils/types'
import {
  barBackgroundColor,
  barBackgroundSelectedColor,
  barCornerRadius,
  taskHeight,
} from 'components/gantt/utils/conf'

import styles from './bar.module.css'
import DateHandle from './date-handle'
interface Props {
  task: BarTask
  isSelected: boolean
}

const Bar: React.FC<Props> = ({ task, isSelected }) => {
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
