import { useEffect, useRef, useState } from 'react'
import { BarTask } from '../utils/types'
import styles from './task.module.css'
import Project from './project/project'
import Bar from './task/bar'

interface Props {
  task: BarTask
}
const TaskItem: React.FC<Props> = ({ task }) => {
  const [isTextInside, setIsTextInside] = useState(true)
  const textRef = useRef<SVGTextElement>(null)

  const getTaskItem = () => {
    console.log('invoke getTaskItem')

    switch (task.typeInternal) {
      case 'project':
        return <Project task={task} isSeleceted={false} />

      default:
        return <Bar task={task} isSelected={false} />
    }
  }

  useEffect(() => {
    if (textRef.current) {
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1)
    }
  }, [textRef, task])

  const getX = () => {
    const width = task.x2 - task.x1
    if (isTextInside) {
      return task.x1 + 20
    }
    return task.x1 + width + 10
  }

  const getY = () => {
    if (isTextInside) {
      return task.y + task.height * 0.5
    }
    return task.y + task.height * 0.65
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
      onClick={(e) => {}}
    >
      {getTaskItem()}
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
