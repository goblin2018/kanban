import TaskItem from './taskbar/taskbar'
import { useEffect, useState } from 'react'
import { BarTask } from './utils/types'

interface Props {
  dates: Date[]
  timeStep: number
  columnWidth: number
  tasks: BarTask[]
}
const Content: React.FC<Props> = ({
  dates,
  timeStep,
  columnWidth,
  tasks,
}) => {
  const [xStep, setXStep] = useState(10)

  useEffect(() => {
    const dateDeleta =
      dates[1].getTime() -
      dates[0].getTime() -
      dates[1].getTimezoneOffset() * 60 * 1000 +
      dates[0].getTimezoneOffset() * 60 * 1000
    setXStep((timeStep * columnWidth) / dateDeleta)
  }, [timeStep, columnWidth, dates])

  return (
    <g className="content">
      <g className="bar">
        {tasks.map((task) => {
          return <TaskItem key={`taskItem-${task.id}`} task={task} />
        })}
      </g>
    </g>
  )
}

export default Content
