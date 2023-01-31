import Col from 'antd/lib/grid/col'
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
  let ts = [...tasks]
  let index = 0
  ts.forEach((t, i) => {
    t.index = index
    index += 1

    loadBarInfoImpl(t, dates, viewMode)
    if (t.type == 'project') {
      t.children?.forEach((tc, j) => {
        tc.index = index
        index += 1
        loadBarInfoImpl(tc, dates, viewMode)
      })
    }
  })

  return { tasks: ts, rowCount: index }
}

const isRun = (year: number) => {
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

  // let columnWidth = ColumnWidthConf[viewMode]
  // const index = dates.findIndex((d) => d.getTime() >= d.getTime()) - 1

  // const remainderMillis = d.getTime() - dates[index].getTime()
  // const percentOfInterval =
  //   remainderMillis / (dates[index + 1].getTime() - dates[index].getTime())
  // const x = index * columnWidth + percentOfInterval * columnWidth
  // return x
}

const taskYCoordinate = (index: number) => {
  const y = index * rowHeight + (rowHeight - taskHeight) / 2
  return y
}
