import {
  barCornerRadius,
  projectBackgroundColor,
  projectBackgroundSelectedColor,
  rowHeight,
  taskHeight,
} from 'components/gantt/utils/conf'
import { GanttTask } from 'components/gantt/utils/types'
import styles from './project.module.css'

interface Props {
  task: GanttTask
  isSeleceted: boolean
  rowIdx: number
}
const Project: React.FC<Props> = ({ task, isSeleceted, rowIdx }) => {
  const barColor = task.barInfo?.color
  const projectWidth = task.barInfo!.x2! - task.barInfo!.x1!
  const y = rowIdx * rowHeight + (rowHeight - taskHeight) / 2 + 10

  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={task.barInfo!.x1!}
        width={projectWidth}
        y={y}
        height={10}
        rx={barCornerRadius}
        ry={barCornerRadius}
        className={styles.projectBackground}
      />
    </g>
  )
}

export default Project
