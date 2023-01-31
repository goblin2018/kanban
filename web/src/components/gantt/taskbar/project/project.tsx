import {
  barCornerRadius,
  projectBackgroundColor,
  projectBackgroundSelectedColor,
  taskHeight,
} from 'components/gantt/utils/conf'
import { GanttTask } from 'components/gantt/utils/types'
import styles from './project.module.css'

interface Props {
  task: GanttTask
  isSeleceted: boolean
}
const Project: React.FC<Props> = ({ task, isSeleceted }) => {
  const barColor = isSeleceted
    ? projectBackgroundSelectedColor
    : projectBackgroundColor

  const projectWidth = task.barInfo!.x2! - task.barInfo!.x1!

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={task.barInfo!.x1!}
        width={projectWidth}
        y={task.barInfo!.y!}
        height={taskHeight}
        rx={barCornerRadius}
        ry={barCornerRadius}
        className={styles.projectBackground}
      />
    </g>
  )
}

export default Project
