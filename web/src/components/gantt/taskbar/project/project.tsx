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
  const y = rowIdx * rowHeight + (rowHeight - taskHeight) / 2 + 20

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
      <text x={task.barInfo!.x2! + 12} y={y + 10} fill={'#000'}>
        {task.name} - {task.end?.diff(task.start, 'day')}天
      </text>
    </g>
  )
}

export default Project
