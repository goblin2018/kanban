import dayjs, { Dayjs } from 'dayjs'
import { ColumnWidthConf, preStepsCount, StepWidth } from './conf'
import { isRun } from './task'
import { GanttTask, ViewMode } from './types'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

type DateHelperScales =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

export const getWeekDay = (d: Dayjs) => {
  let arr = ['日', '一', '二', '三', '四', '五', '六']
  return arr[d.day()]
}

export const getMonth = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
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

export const seedDates = (
  startDate: Dayjs,
  endDate: Dayjs,
  viewMode: ViewMode
) => {
  switch (viewMode) {
    case ViewMode.Year:
      startDate = startDate.subtract(1, 'y').startOf('y')
      endDate = endDate.add(2, 'y').endOf('y')
      break
    case ViewMode.Month:
      startDate = startDate.subtract(preStepsCount, 'M').startOf('M')
      endDate = endDate.add(2, 'M').endOf('M')
      break
    case ViewMode.Week:
      startDate = startDate.subtract(preStepsCount, 'w').startOf('w')
      endDate = endDate.add(1, 'M').endOf('M')
      break
    case ViewMode.Day:
      startDate = startDate.subtract(preStepsCount, 'd').startOf('d')
      endDate = endDate.add(20, 'd').endOf('d')
      break
  }

  let currentDate = startDate
  const dates: Dayjs[] = [currentDate]
  while (currentDate < endDate) {
    switch (viewMode) {
      case ViewMode.Year:
        currentDate = currentDate.add(1, 'y')
        break
      case ViewMode.Month:
        currentDate = currentDate.add(1, 'M')
        break
      case ViewMode.Week:
        currentDate = currentDate.add(1, 'w')
        break
      case ViewMode.Day:
        currentDate = currentDate.add(1, 'd')
        break
    }
    dates.push(currentDate)
  }
  return dates
}

export const getWeekNumberISO8601 = (date: Date) => {
  const tmpDate = new Date(date.valueOf())
  const dayNumber = (tmpDate.getDay() + 6) % 7
  tmpDate.setDate(tmpDate.getDate() - dayNumber + 3)
  const firstThursday = tmpDate.valueOf()
  tmpDate.setMonth(0, 1)
  if (tmpDate.getDay() !== 4) {
    tmpDate.setMonth(0, 1 + ((4 - tmpDate.getDay() + 7) % 7))
  }
  const weekNumber = (
    1 + Math.ceil((firstThursday - tmpDate.valueOf()) / 604800000)
  ).toString()

  if (weekNumber.length === 1) {
    return `0${weekNumber}`
  } else {
    return weekNumber
  }
}

export const xToDate = (x: number, start: Dayjs, viewMode: ViewMode) => {
  let d = 0
  let m = 0
  let y = 0
  switch (viewMode) {
    case ViewMode.Day:
      d = Math.floor(x / StepWidth[ViewMode.Day])
      return start.add(d, 'd')
    case ViewMode.Week:
      d = Math.floor(x / StepWidth[ViewMode.Week])
      return start.add(d, 'd')
    case ViewMode.Month:
      m = Math.floor(x / ColumnWidthConf[ViewMode.Month])
      let md = start.add(m, 'M')
      let days = Math.floor(
        ((x % ColumnWidthConf[ViewMode.Month]) /
          ColumnWidthConf[ViewMode.Month]) *
          md.endOf('M').date()
      )
      return md.add(days, 'd')
    case ViewMode.Year:
      y = Math.floor(x / ColumnWidthConf[ViewMode.Year])
      let my = start.add(y, 'y')
      let ds = Math.floor(
        ((x % ColumnWidthConf[ViewMode.Year]) /
          ColumnWidthConf[ViewMode.Year]) *
          my.endOf('y').dayOfYear()
      )

      return my.add(ds, 'd')
  }
}
