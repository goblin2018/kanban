import { getWeekDay } from '../utils/date'
import { ViewMode } from '../utils/types'

import styles from './calendar.module.css'
import TopPartOfCalendar from './calendar-top'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { headerHeight } from '../utils/conf'
import { useAppSelector } from 'app/hooks'

const Calendar = () => {
  const { columnWidth, dates, viewMode, totalWidth, scrollLeft } =
    useAppSelector((s) => s.gantt)

  const [topValues, setTopValues] = useState<any[]>([])
  const [bottomValues, setBottomValues] = useState<any[]>([])

  const getCalendarValuesForDay = () => {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []

    let topValue = ''
    dates.map((d, i) => {
      const bottomValue = `${d.date()} ${getWeekDay(d)}`
      bottomValues.push(
        <text
          key={d.unix()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + 0.5)}
          fontSize={12}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      )

      let tp = d.format('YYYY-MM')
      if (tp != topValue) {
        let endi = i + (d.endOf('M').date() - d.date()) + 1
        topValue = tp
        topValues.push(
          <TopPartOfCalendar
            key={topValue + d.year()}
            value={topValue}
            x1Line={columnWidth * endi}
            xText={columnWidth * i + 20}
            maxXText={columnWidth * endi - 80}
          />
        )
      }
    })

    // 判断最后一个是否需要添加

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  const getCalendarValuesForWeek = () => {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    let topValue = ''

    dates.map((d, i) => {
      const bottomValue = `${d.week()}`
      bottomValues.push(
        <text
          key={d.unix()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + 0.5)}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      )

      let tp = d.format('YYYY-MM')
      if (tp != topValue) {
        let endi = i + (d.endOf('M').date() - d.date() + 1) / 7
        topValue = tp
        topValues.push(
          <TopPartOfCalendar
            key={topValue + d.year()}
            value={topValue}
            x1Line={columnWidth * endi}
            xText={columnWidth * i + 20}
            maxXText={columnWidth * endi - 80}
          />
        )
      }
    })

    setTopValues(topValues)
    setBottomValues(bottomValues)
  }

  // const getCalendarValuesForMonth = () => {
  //   const topValues: ReactNode[] = []
  //   const bottomValues: ReactNode[] = []
  //   const topDefaultHeight = headerHeight * 0.5
  //   dates.map((d, i) => {
  //     const bottomValue = `${d.week()}`
  //     bottomValues.push(
  //       <text
  //         key={d.unix()}
  //         y={headerHeight * 0.8}
  //         x={columnWidth * (i + 0.5)}
  //         className={styles.calendarBottomText}
  //       >
  //         {bottomValue}
  //       </text>
  //     )

  //     if (i + 1 !== dates.length && d.month() !== dates[i + 1].month()) {
  //       const topValue = d.format('YYYY-MM')

  //       topValues.push(
  //         <TopPartOfCalendar
  //           key={topValue + d.year()}
  //           value={topValue}
  //           x1Line={columnWidth * (i - 1)}
  //           y1Line={0}
  //           y2Line={topDefaultHeight}
  //           xText={
  //             columnWidth * (i - 1) - d.endOf('M').date() * columnWidth * 0.5
  //           }
  //           maxXText={0}
  //           yText={topDefaultHeight * 0.9}
  //         />
  //       )
  //     }
  //   })

  //   setTopValues(topValues)
  //   setBottomValues(bottomValues)
  // }

  // const getCalendarValuesForYear = () => {
  //   const topValues: ReactNode[] = []
  //   const bottomValues: ReactNode[] = []
  //   const topDefaultHeight = headerHeight * 0.5
  //   dates.map((d, i) => {
  //     const bottomValue = `${d.week()}`
  //     bottomValues.push(
  //       <text
  //         key={d.unix()}
  //         y={headerHeight * 0.8}
  //         x={columnWidth * (i + 0.5)}
  //         className={styles.calendarBottomText}
  //       >
  //         {bottomValue}
  //       </text>
  //     )

  //     if (i + 1 < dates.length && d.month() !== dates[i + 1].month()) {
  //       const topValue = d.format('YYYY-MM')

  //       topValues.push(
  //         <TopPartOfCalendar
  //           key={topValue + d.year()}
  //           value={topValue}
  //           x1Line={columnWidth * (i - 1)}
  //           y1Line={0}
  //           y2Line={topDefaultHeight}
  //           xText={
  //             columnWidth * (i - 1) - d.endOf('M').date() * columnWidth * 0.5
  //           }
  //           maxXText={t}
  //           yText={topDefaultHeight * 0.9}
  //         />
  //       )
  //     }
  //   })

  //   setTopValues(topValues)
  //   setBottomValues(bottomValues)
  // }

  useEffect(() => {
    switch (viewMode) {
      case ViewMode.Day:
        getCalendarValuesForDay()
        break
      case ViewMode.Week:
        getCalendarValuesForWeek()
        break
      // case ViewMode.Month:
      //   getCalendarValuesForMonth()
      //   break
      // case ViewMode.Year:
      //   getCalendarValuesForYear()
      //   break

      default:
        break
    }
  }, [viewMode, dates])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalWidth}
      height={headerHeight}
      // fontFamily={barProps.fontFamily}
    >
      <g className="calendar">
        <rect
          x={0}
          y={0}
          width={totalWidth}
          height={headerHeight}
          className={styles.calendarHeader}
        />
        {bottomValues} {topValues}
      </g>
    </svg>
  )
}

export default Calendar
