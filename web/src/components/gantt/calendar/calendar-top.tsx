import { useAppSelector } from 'app/hooks'
import { useMemo } from 'react'
import { calendarTopHeight } from '../utils/conf'
import styles from './calendar.module.css'

interface Props {
  value: string
  x1Line: number

  xText: number
  maxXText: number
}

const TopPartOfCalendar: React.FC<Props> = ({
  value,
  x1Line,

  xText,
  maxXText,
}) => {
  const scrollLeft = useAppSelector((s) => s.gantt.scrollLeft)

  const xt = useMemo(() => {
    let now = scrollLeft + 40
    if (now <= xText) {
      return xText
    } else if (now <= maxXText) {
      return now
    } else {
      return maxXText
    }
  }, [scrollLeft, xText, maxXText])

  return (
    <g className="calendarTop">
      <line
        x1={x1Line}
        y1={0}
        x2={x1Line}
        y2={calendarTopHeight}
        className={styles.calendarTopTick}
      />
      <text
        key={value + 'text'}
        y={calendarTopHeight * 0.9}
        x={xt}
        className={styles.calendarTopText}
      >
        {value}
      </text>
    </g>
  )
}

export default TopPartOfCalendar
