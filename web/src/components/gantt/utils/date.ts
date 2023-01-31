import { preStepsCount } from './conf'
import { GanttTask, ViewMode } from './types'

type DateHelperScales =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

export const getWeekDay = (date: Date) => {
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[date.getDay()]
}

export const getMonth = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}
export const addToDate = (
  date: Date,
  quantity: number,
  scale: DateHelperScales
) => {
  const newDate = new Date(
    date.getFullYear() + (scale == 'year' ? quantity : 0),
    date.getMonth() + (scale == 'month' ? quantity : 0),
    date.getDate() + (scale === 'day' ? quantity : 0),
    date.getHours() + (scale === 'hour' ? quantity : 0),
    date.getMinutes() + (scale === 'minute' ? quantity : 0),
    date.getSeconds() + (scale === 'second' ? quantity : 0),
    date.getMilliseconds() + (scale === 'millisecond' ? quantity : 0)
  )
  return newDate
}

export const startOfDate = (date: Date, scale: DateHelperScales) => {
  switch (scale) {
    case 'year':
      return new Date(date.getFullYear())
    case 'month':
      return new Date(date.getFullYear(), date.getMonth())

    default: // default day
      return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
}

export const ganttDateRange = (tasks: GanttTask[], viewMode: ViewMode) => {
  // TODO 处理task中没有时间的问题
  let newStartDate: Date = tasks[0].start!
  let newEndDate: Date = tasks[0].end!
  for (const t of tasks) {
    if (t.start! < newStartDate) {
      newStartDate = t.start!
    }
    if (t.end! > newEndDate) {
      newEndDate = t.end!
    }
  }

  switch (viewMode) {
    case ViewMode.Year:
      newStartDate = addToDate(newStartDate, -1, 'year')
      newStartDate = startOfDate(newStartDate, 'year')
      newEndDate = addToDate(newEndDate, 1, 'year')
      newEndDate = startOfDate(newEndDate, 'year')
      break
    case ViewMode.Month:
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, 'month')
      newStartDate = startOfDate(newStartDate, 'month')
      newEndDate = addToDate(newEndDate, 1, 'year')
      newEndDate = startOfDate(newEndDate, 'year')
      break
    case ViewMode.Week:
      newStartDate = startOfDate(newStartDate, 'day')
      newStartDate = addToDate(
        getMonday(newStartDate),
        -7 * preStepsCount,
        'day'
      )
      newEndDate = startOfDate(newEndDate, 'day')
      newEndDate = addToDate(newEndDate, 1.5, 'month')
      break
    case ViewMode.Day:
      newStartDate = startOfDate(newStartDate, 'day')
      newStartDate = addToDate(newStartDate, -1 * preStepsCount, 'day')
      newEndDate = startOfDate(newEndDate, 'day')
      newEndDate = addToDate(newEndDate, 3, 'day')
      break
  }
  return [newStartDate, newEndDate]
}

const getMonday = (d: Date) => {
  let day = d.getDay()
  day = day == 0 ? -7 : day
  const mon = d.getDate() - day + 1
  return new Date(d.setDate(mon))
}

export const seedDates = (
  startDate: Date,
  endDate: Date,
  viewMode: ViewMode
) => {
  let currentDate: Date = new Date(startDate)
  const dates: Date[] = [currentDate]
  while (currentDate < endDate) {
    switch (viewMode) {
      case ViewMode.Year:
        currentDate = addToDate(currentDate, 1, 'year')
        break
      case ViewMode.Month:
        currentDate = addToDate(currentDate, 1, 'month')
        break
      case ViewMode.Week:
        currentDate = addToDate(currentDate, 7, 'day')
        break
      case ViewMode.Day:
        currentDate = addToDate(currentDate, 1, 'day')
        break
    }
    dates.push(currentDate)
  }
  return dates
}
