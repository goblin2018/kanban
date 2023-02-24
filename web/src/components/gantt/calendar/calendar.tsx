import { getWeekDay } from '../utils/date'
import { ViewMode } from '../utils/types'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useAppSelector } from 'app/hooks'
import { headerHeight } from '../utils/conf'

const Calendar = () => {
  const { columnWidth, dates, viewMode, totalWidth, scrollLeft, scrollTop } =
    useAppSelector((s) => s.gantt)

  const [topValues, setTopValues] = useState<any[]>([])
  const [bottomValues, setBottomValues] = useState<any[]>([])

  const getCalendarValuesForDay = () => {
    const topValues: any[] = []
    const bottomValues: ReactNode[] = []

    let topValue = ''
    dates.map((d, i) => {
      bottomValues.push(
        <>
          <div>{d.date()}</div>
          <div className="text-text-disabled ml-1">{getWeekDay(d)}</div>
        </>
      )

      let tp = d.format('YYYY-MM')
      if (tp != topValue) {
        let endi = i + (d.endOf('M').date() - d.date()) + 1
        topValue = tp

        topValues.push({
          start: i * columnWidth,
          end: endi * columnWidth,
          info: tp,
        })
      }
    })

    // 判断最后一个是否需要添加

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  const getCalendarValuesForWeek = () => {
    const topValues: any[] = []
    const bottomValues: ReactNode[] = []
    let topValue = ''

    let lastEnd = 0
    dates.map((d, i) => {
      bottomValues.push(<div>{d.week()}</div>)

      let tp = d.format('YYYY-MM')
      if (tp != topValue) {
        let endi = i + (d.endOf('M').date() - d.date() + 1) / 7
        topValue = tp

        topValues.push({
          start: lastEnd * columnWidth,
          end: endi * columnWidth,
          info: tp,
        })

        lastEnd = endi
      }
    })

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  const getCalendarValuesForMonth = () => {
    const topValues: any[] = []
    const bottomValues: ReactNode[] = []
    let topValue = ''

    let lastEnd = 0
    dates.map((d, i) => {
      bottomValues.push(<div>{d.month() + 1}</div>)

      let tp = d.format('YYYY')
      if (tp != topValue) {
        let endi = i + 12
        topValue = tp

        topValues.push({
          start: lastEnd * columnWidth,
          end: endi * columnWidth,
          info: tp,
        })

        lastEnd = endi
      }
    })

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  const getCalendarValuesForYear = () => {
    const topValues: any[] = []
    const bottomValues: ReactNode[] = []

    dates.map((d, i) => {
      bottomValues.push(<div>{d.year()}</div>)
    })

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  useEffect(() => {
    switch (viewMode) {
      case ViewMode.Day:
        getCalendarValuesForDay()
        break
      case ViewMode.Week:
        getCalendarValuesForWeek()
        break
      case ViewMode.Month:
        getCalendarValuesForMonth()
        break
      case ViewMode.Year:
        getCalendarValuesForYear()
        break

      default:
        break
    }
  }, [viewMode, dates])

  const calcIndent = (start: number, end: number) => {
    if (scrollLeft < start) {
      return 20
    } else if (scrollLeft < end - 80) {
      return scrollLeft - start + 20
    } else {
      return 20
    }
  }

  return (
    <div
      className="absolute bg-white overflow-hidden"
      style={{
        top: scrollTop,
        zIndex: 999,
        height: headerHeight,
        width: totalWidth,
      }}
    >
      <div className="flex">
        {topValues.map((t, i) => (
          <div
            className="flex-shrink-0"
            key={`ct${i}`}
            style={{
              textIndent: calcIndent(t.start, t.end),
              width: t.end - t.start,
              borderRight: '1px solid #ababab',
            }}
          >
            {t.info}
          </div>
        ))}
      </div>
      <div className="flex">
        {bottomValues.map((b, i) => (
          <div
            key={`cb${i}`}
            className="flex items-center justify-center text-xs flex-shrink-0"
            style={{ width: columnWidth, borderRight: '1px solid #ababab' }}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
