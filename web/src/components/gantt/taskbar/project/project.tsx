import {
  barCornerRadius,
  projectBackgroundColor,
  projectBackgroundSelectedColor,
  taskHeight,
} from 'components/gantt/utils/conf'
import { BarTask } from 'components/gantt/utils/types'
import styles from './project.module.css'

interface Props {
  task: BarTask
  isSeleceted: boolean
}
const Project: React.FC<Props> = ({ task, isSeleceted }) => {
  const barColor = isSeleceted
    ? projectBackgroundSelectedColor
    : projectBackgroundColor

  const projectWidth = task.x2 - task.x1

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={task.x1}
        width={projectWidth}
        y={task.y}
        height={taskHeight}
        rx={barCornerRadius}
        ry={barCornerRadius}
        className={styles.projectBackground}
      />
    </g>
  )
}

export default Project
