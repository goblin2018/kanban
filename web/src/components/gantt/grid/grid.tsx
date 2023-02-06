import styles from './grid.module.css'
import { rowHeight } from '../utils/conf'
import { useAppSelector } from 'app/hooks'
import dayjs from 'dayjs'

interface Props {
  todayColor?: string
}
const Grid: React.FC<Props> = ({ todayColor = 'rgba(252, 248, 227, 0.5)' }) => {
  const { totalWidth, rowCount, dates, columnWidth } = useAppSelector(
    (s) => s.gantt
  )
  let y = 0
  let gridRows = []
  const rowLines = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={totalWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ]

  for (let i = 0; i < rowCount; i++) {
    gridRows.push(
      <rect
        key={`row${i}`}
        x="0"
        y={y}
        width={totalWidth}
        height={rowHeight}
        className={styles.gridRow}
      />
    )
    rowLines.push(
      <line
        key={`RowLine` + i}
        x="0"
        y1={y + rowHeight}
        x2={totalWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    )
    y += rowHeight
  }

  const now = dayjs()
  let tickX = 0
  let ticks = []
  let today = <rect />
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    ticks.push(
      <line
        key={date.unix()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    )

    if (
      (i + 1 !== dates.length &&
        date.isBefore(now) &&
        dates[i + 1].isAfter(now)) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        date.isBefore(now) &&
        date.add(date.unix() - dates[i - 1].unix(), 's').isAfter(now))
    ) {
      today = (
        <rect
          x={tickX}
          y={0}
          width={columnWidth}
          height={y}
          fill={todayColor}
        />
      )
    }
    tickX += columnWidth
  }
  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">{ticks}</g>
      <g className="today">{today}</g>
    </g>
  )
}

export default Grid
