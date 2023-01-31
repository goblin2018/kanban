import { useEffect, useRef, useState } from 'react'
import { GanttTask } from '../utils/types'
import styles from './task.module.css'
import Project from './project/project'
import Bar from './task/bar'
import { taskHeight } from '../utils/conf'

interface Props {
  task: GanttTask
}
const TaskItem: React.FC<Props> = ({ task }) => {
  const [isTextInside, setIsTextInside] = useState(true)
  const textRef = useRef<SVGTextElement>(null)

  const getTaskItem = () => {
    console.log('invoke getTaskItem')

    switch (task.type) {
      case 'project':
        return <Project task={task} isSeleceted={false} />

      default:
        return <Bar task={task} isSelected={false} />
    }
  }

  useEffect(() => {
    if (textRef.current) {
      setIsTextInside(
        textRef.current.getBBox().width < task.barInfo!.x2! - task.barInfo!.x1!
      )
    }
  }, [textRef, task])

  const getX = () => {
    const width = task.barInfo!.x2! - task.barInfo!.x1!
    if (isTextInside) {
      return task.barInfo!.x1! + 20
    }
    return task.barInfo!.x1! + width + 10
  }

  const getY = () => {
    if (isTextInside) {
      return task.barInfo!.y! + taskHeight * 0.5
    }
    return task.barInfo!.y! + taskHeight * 0.65
  }

  return (
    <g
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
      <text
        x={getX()}
        y={getY()}
        className={
          isTextInside
            ? styles.barLabel
            : styles.barLabel && styles.barLabelOutside
        }
        ref={textRef}
      >
        {task.name}
      </text>
    </g>
  )
}

export default TaskItem
