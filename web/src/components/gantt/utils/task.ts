import { TaskGroup } from 'api/taskgroup'
import dayjs, { Dayjs } from 'dayjs'
import {
  barBackgroundColor,
  ColumnWidthConf,
  projectBackgroundColor,
  rowHeight,
  StepWidth,
  taskHeight,
} from './conf'
import { addToDate, getDaysInMonth } from './date'
import { GanttTask, ViewMode } from './types'

export const loadBarInfo = (
  tasks: GanttTask[],
  dates: Date[],
  viewMode: ViewMode
) => {
  let ts = tasks.map((t) => ({ ...t }))

  ts.forEach((t, i) => {
    t.index = i
    loadBarInfoImpl(t, dates, viewMode)
  })

  return ts
}

export const isRun = (year: number) => {
  return (year % 100 != 0 && year % 4 == 0) || year % 400 == 0
}

const loadBarInfoImpl = (
  task: GanttTask,
  dates: Date[],
  viewMode: ViewMode
) => {
  let barInfo = task.barInfo
  barInfo = {
    color: task.type == 'project' ? projectBackgroundColor : barBackgroundColor,
  }
  barInfo.x1 = taskXCoordinate(task.start!, dates, viewMode)
  barInfo.x2 = taskXCoordinate(task.end!, dates, viewMode, true)
  barInfo.y = taskYCoordinate(task.index)
  task.barInfo = barInfo
}

const taskXCoordinate = (
  d: Date,
  dates: Date[],
  viewMode: ViewMode,
  isEnd: boolean = false
) => {
  if (isEnd) {
    d = addToDate(d, 1, 'day')
  }
  let start = dates[0]
  if (viewMode == ViewMode.Day || viewMode == ViewMode.Week) {
    let step = StepWidth[viewMode]
    return ((d.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) * step
  }

  if (viewMode == ViewMode.Month) {
    let dm =
      (d.getFullYear() - start.getFullYear()) * 12 +
      (d.getMonth() - start.getMonth())

    let dday = d.getDate() / getDaysInMonth(d.getFullYear(), d.getMonth())
    return (dm + dday) * ColumnWidthConf[ViewMode.Month]
  }

  // viewMode year

  let dy = d.getFullYear() - start.getFullYear()

  let days = d.getDate()
  for (let index = 0; index < d.getMonth(); index++) {
    days += getDaysInMonth(d.getFullYear(), index)
  }
  let totalDays = isRun(d.getFullYear()) ? 366 : 365

  return (dy + days / totalDays) * ColumnWidthConf[ViewMode.Year]
}

const taskYCoordinate = (index: number) => {
  const y = index * rowHeight + (rowHeight - taskHeight) / 2
  return y
}

export const convertToGanttTaks = (tgs: TaskGroup[]) => {
  let index = 0

  let tasks: GanttTask[] = []

  let totalStart: Dayjs | undefined = undefined
  let totalEnd: Dayjs | undefined = undefined

  tgs.forEach((tg, i) => {
    // 修改数据
    let groupIndex = index
    tasks.push({
      id: tg.id!,
      name: tg.name!,
      pIndex: i,
      index: groupIndex,
      hideChildren: false,
      type: 'project',
      barInfo: {
        color: tg.color!,
      },
    })

    index += 1

    if (tg.tasks) {
      let groupStart: Dayjs | undefined = undefined
      let groupEnd: Dayjs | undefined = undefined
      tg.tasks.forEach((t, j) => {
        let start = t.startAt ? dayjs(t.startAt) : undefined
        let end = t.endAt ? dayjs(t.endAt) : undefined

        tasks.push({
          id: t.id!,
          name: t.name!,
          pIndex: [i, j],
          index: index,
          type: 'task',
          start: start,
          end: end,
          barInfo: {
            color: tg.color!,
          },
        })

        if (start && start.isBefore(groupStart)) {
          groupStart = start
        }
        if (end && end.isAfter(groupEnd)) {
          groupEnd = end
        }

        if (start && start.isBefore(totalStart)) {
          totalStart = start
        }
        if (end && end.isAfter(totalEnd)) {
          totalEnd = end
        }
      })

      tasks[groupIndex].start = groupStart
      tasks[groupIndex].end = groupEnd

      index += 1
    }
  })

  return {
    tasks: tasks,
    start: totalStart || dayjs(),
    end: totalEnd || dayjs(),
  }
}
