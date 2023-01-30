import { barBackgroundColor, barBackgroundSelectedColor, barCornerRadius, barProgressColor, barProgressSelectedColor, handleWidth, rowHeight, taskHeight } from './conf'
import { Task } from './types'

export const sortTask = (a: Task, b: Task) => {
  let oa = a.displayOrder || Number.MAX_VALUE
  let ob = b.displayOrder || Number.MAX_VALUE
  if (oa > ob) {
    return 1
  } else if (oa == ob) {
    return 0
  } else {
    return -1
  }
}

export const removeHiddenTasks = (tasks: Task[]) => {
  const groupedTasks = tasks.filter(
    (t) => t.hideChildren && t.type == 'project'
  )

  if (groupedTasks.length > 0) {
    for (let i = 0; i < groupedTasks.length; i++) {
      const gt = groupedTasks[i]
      const children = getChildren(tasks, gt)
      tasks = tasks.filter((t) => children.indexOf(t) == -1)
    }
  }
  return tasks
}

const getChildren = (taskList: Task[], task: Task) => {
  let tasks: Task[] = []
  if (task.type == 'project') {
    tasks = taskList.filter(
      (t) => t.dependencies && t.dependencies.indexOf(task.id) !== -1
    )
  } else {
    tasks = taskList.filter((t) => t.project && t.project == task.id)
  }
  let taskChildren: Task[] = []
  tasks.forEach((t) => taskChildren.push(...taskList, t))
  tasks = tasks.concat(tasks, taskChildren)
  return tasks
}

export const convertToBarTasks = (
  tasks: Task[],
  dates: Date[],
  columnWidth: number,

) => {
  let barTasks = tasks.map((t, i) => {
    return convertToBarTask(
      t,
      i,
      dates,
      columnWidth,
    )
  })
  return barTasks
}

const convertToBarTask = (
  task: Task,
  index: number,
  dates: Date[],
  columnWidth: number,
  
) => {
  let x1 = taskXCoordinate(task.start, dates, columnWidth)
  let x2 = taskXCoordinate(task.end, dates, columnWidth)

  let typeInternal = task.type
  if (typeInternal == 'task' && x2 - x1 < handleWidth * 2) {
    typeInternal = 'smalltask'
    x2 = x1 + handleWidth * 2
  }
  const [progressWidth, progressX] = progressWithByParams(x1, x2, task.progress)
  const y = taskYCoordinate(index)
  const hideChildren = task.type == 'project' ? task.hideChildren : undefined

  const styles = {
    backgroundColor: barBackgroundColor,
    backgroundSelectedColor: barBackgroundSelectedColor,
    progressColor: barProgressColor,
    progressSelectedColor: barProgressSelectedColor,
    ...task.styles,
  }

  return {
    ...task,
    typeInternal,
    x1,
    x2,
    y,
    index,
    progressX,
    progressWidth,
    barCornerRadius,
    handleWidth,
    hideChildren,
    height: taskHeight,
    barChildren: [],
    styles,
  }
}

const taskXCoordinate = (xDate: Date, dates: Date[], columnWidth: number) => {
  const index = dates.findIndex((d) => d.getTime() >= xDate.getTime()) - 1

  const remainderMillis = xDate.getTime() - dates[index].getTime()
  const percentOfInterval =
    remainderMillis / (dates[index + 1].getTime() - dates[index].getTime())
  const x = index * columnWidth + percentOfInterval * columnWidth
  return x
}

export const progressWithByParams = (
  taskX1: number,
  taskX2: number,
  progress: number
) => {
  const progressWidth = (taskX2 - taskX1) * progress * 0.01
  let progressX = taskX1
  return [progressWidth, progressX]
}

const taskYCoordinate = (
  index: number,

) => {
  const y = index * rowHeight + (rowHeight - taskHeight) / 2
  return y
}
