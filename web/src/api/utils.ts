import dayjs from 'dayjs'

export const toShortDate = (
  t: string | undefined | dayjs.Dayjs,
  split: string = '-'
) => {
  if (!t) {
    return ''
  }

  let td: dayjs.Dayjs
  if (typeof t == 'string') {
    td = dayjs(t)
  } else {
    td = t
  }
  return dayjsToStr(td, split)
}

export const strToDayjs = (t: string | undefined) => {
  if (!t) {
    return undefined
  }

  return dayjs(t, 'YYYY-MM-DD').add(8, 'h')
}

export const dayjsToStr = (t: dayjs.Dayjs | undefined, split: string = '-') => {
  if (!t) {
    return undefined
  }

  return t.format(`YYYY${split}MM${split}DD`)
}

export const toDateString = (t: string) => {
  return dayjs(t).format('YYYY/MM/DD HH:mm:ss')
}

export const dateSuffix = (t: string) => {
  let d = dayjs(t)

  let now = dayjs()
  let suffix = ''
  let info = ''
  if (now.subtract(10, 'm').isBefore(d)) {
    suffix = '刚刚'
    info = d.format('HH:mm')
  } else if (d.startOf('d').isSame(now.startOf('d'))) {
    suffix = '今天'
    info = d.format('HH:mm')
  } else if (d.startOf('d').add(1, 'd').isSame(now.startOf('d'))) {
    suffix = '昨天'
    info = d.format('HH:mm')
  } else {
    info = d.format('YYYY/MM/DD HH:mm')
  }
  return { suffix, info }
}
