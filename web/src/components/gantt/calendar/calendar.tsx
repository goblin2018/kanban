import { getWeekDay, getMonth } from '../utils/date'
import { ViewMode } from '../utils/types'

import styles from './calendar.module.css'
import TopPartOfCalendar from './calendar-top'
import { ReactNode, useMemo } from 'react'
import { ColumnWidthConf, headerHeight } from '../utils/conf'
import { useAppSelector } from 'app/hooks'

const Calendar = () => {
  const { columnWidth, dates, viewMode, totalWidth } = useAppSelector(
    (s) => s.gantt
  )

  let topValues: any[] = []
  let bottomValues: any[] = []

  const getCalendarValuesForDay = () => {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    const topDefaultHeight = headerHeight * 0.5
    dates.map((d, i) => {
      const bottomValue = `${getWeekDay(d)}  ${d.date()}`
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

      if (i + 1 !== dates.length && d.month() !== dates[i + 1].month()) {
        const topValue = d.format('YYYY年MM月')

        topValues.push(
          <TopPartOfCalendar
            key={topValue + d.year()}
            value={topValue}
            x1Line={columnWidth * (i - 1)}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={
              columnWidth * (i - 1) - d.endOf('M').date() * columnWidth * 0.5
            }
            yText={topDefaultHeight * 0.9}
          />
        )
      }
    })

    // return [topValues, bottomValues]
  }

  switch (viewMode) {
    case ViewMode.Day:
      getCalendarValuesForDay()
      break
    default:
      break
  }

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
