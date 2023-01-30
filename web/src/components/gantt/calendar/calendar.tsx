import { getDaysInMonth, getLocalDayOfWeek, getLocaleMonth } from '../date'
import { DateSetup, ViewMode } from '../types'

import styles from './calendar.module.css'
import TopPartOfCalendar from './calendar-top'
import { ReactNode } from 'react'

interface Props {
  viewMode: ViewMode
  dateSetup: DateSetup
  locale: string
  headerHeight: number
  columnWidth: number
}

const Calendar: React.FC<Props> = ({
  viewMode,
  headerHeight,
  columnWidth,
  dateSetup,
  locale,
}) => {
  let topValues: any[] = []
  let bottomValues: any[] = []

  const getCalendarValuesForDay = () => {
    const topValues: ReactNode[] = []
    const bottomValues: ReactNode[] = []
    const topDefaultHeight = headerHeight * 0.5
    const dates = dateSetup.dates
    dates.map((d, i) => {
      const bottomValue = `${getLocalDayOfWeek(d, locale, 'narrow')}  ${d
        .getDate()
        .toString()}`
      bottomValues.push(
        <text
          key={d.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + 0.5)}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      )

      if (i + 1 !== dates.length && d.getMonth() !== dates[i + 1].getMonth()) {
        const topValue = getLocaleMonth(d)
        
        topValues.push(
          <TopPartOfCalendar
            key={topValue + d.getFullYear()}
            value={topValue}
            x1Line={columnWidth * (i - 1)}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={
              columnWidth * (i - 1) -
              getDaysInMonth(d.getMonth(), d.getFullYear()) * columnWidth * 0.5
            }
            yText={topDefaultHeight * 0.9}
          />
        )
      }
    })

    return [topValues, bottomValues]
  }

  switch (viewMode) {
    case ViewMode.Day:
      ;[topValues, bottomValues] = getCalendarValuesForDay()
      break
    default:
      break
  }

  return (
    <g className="calendar">
      <rect
        x={0}
        y={0}
        width={columnWidth * dateSetup.dates.length}
        height={headerHeight}
        className={styles.calendarHeader}
      />
      {bottomValues} {topValues}
    </g>
  )
}

export default Calendar
