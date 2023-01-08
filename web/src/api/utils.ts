import dayjs from 'dayjs'

export const toShortDate = (t: string | undefined) => {
  if (!t) {
    return ''
  }
  let i = t.indexOf('T')
  return t.substring(0, i)
}

export const strToDayjs = (t: string | undefined) => {
  if (!t) {
    return undefined
  }

  return dayjs(t, 'YYYY-MM-DD')
}

export const dayjsToStr = (t: dayjs.Dayjs | undefined) => {
  if (!t) {
    return undefined
  }

  return t.format('YYYY-MM-DD')
}
