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
import { GanttTask, ViewMode } from './types'
import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

export const loadBarInfo = (
  tasks: GanttTask[],
  dates: Dayjs[],
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
  dates: Dayjs[],
  viewMode: ViewMode
) => {
  let barInfo = task.barInfo!
  if (task.start) {
    barInfo.x1 = taskXCoordinate(task.start, dates, viewMode)
    if (!task.end) {
      task.end = task.start
    }
    barInfo.x2 = taskXCoordinate(task.end, dates, viewMode, true)
    barInfo.y = taskYCoordinate(task.index)
  }
  task.barInfo = barInfo
}

const taskXCoordinate = (
  d: Dayjs,
  dates: Dayjs[],
  viewMode: ViewMode,
  isEnd: boolean = false
) => {
  if (isEnd) {
    d = d.add(1, 'd')
  }
  let start = dates[0]
  if (viewMode == ViewMode.Day || viewMode == ViewMode.Week) {
    let step = StepWidth[viewMode]
    return d.diff(start, 'd') * step
  }

  if (viewMode == ViewMode.Month) {
    let dm = d.diff(start, 'M')
    let dday = d.date() / d.endOf('M').date()
    return (dm + dday) * ColumnWidthConf[ViewMode.Month]
  }

  // viewMode year

  let dy = d.diff(start, 'y')

  let days = d.dayOfYear()
  let totalDays = d.endOf('y').dayOfYear()

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
