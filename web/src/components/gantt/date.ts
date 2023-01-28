import { Task, ViewMode } from './types'
import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import DateTimeFormat = Intl.DateTimeFormat

type DateHelperScales =
  | 'year'
  | 'month'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'

const intlDTCache: any = {}

export const getLocalDayOfWeek = (
  date: Date,
  locale: string,
  format?: 'long' | 'short' | 'narrow'
) => {
  let bottomValue = getCachedDateTimeFormat(locale, { weekday: format }).format(
    date
  )
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase()
  )
  return bottomValue
}

export const getCachedDateTimeFormat = (
  locString: string | string[],
  opts: DateTimeFormatOptions = {}
): DateTimeFormat => {
  const key = JSON.stringify([locString, opts])
  let dtf = intlDTCache[key]
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts)
    intlDTCache[key] = dtf
  }
  return dtf
}

export const getLocaleMonth = (date: Date, locale: string) => {
  let bottomValue = getCachedDateTimeFormat(locale, { month: 'long' }).format(
    date
  )
  bottomValue = bottomValue.replace(
    bottomValue[0],
    bottomValue[0].toLocaleUpperCase()
  )
  return bottomValue
}

export const getDaysInMonth = (month: number, year: number) => {
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

export const ganttDateRange = (
  tasks: Task[],
  viewMode: ViewMode,
  preStepsCount: number
) => {
  let newStartDate: Date = tasks[0].start
  let newEndDate: Date = tasks[0].end
  for (const t of tasks) {
    if (t.start < newStartDate) {
      newStartDate = t.start
    }
    if (t.end > newEndDate) {
      newEndDate = t.end
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
      newEndDate = addToDate(newEndDate, 66, 'hour')
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
