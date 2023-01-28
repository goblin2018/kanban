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
