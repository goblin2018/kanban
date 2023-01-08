import DateTimeFormatOptions = Intl.DateTimeFormatOptions
import DateTimeFormat = Intl.DateTimeFormat

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
