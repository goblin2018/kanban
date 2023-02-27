import styles from './grid.module.css'
import { ColumnWidthConf, rowHeight } from '../utils/conf'
import { useAppSelector } from 'app/hooks'
import dayjs from 'dayjs'
import { taskXCoordinate } from '../utils/task'

interface Props {
  todayColor?: string
}
const Grid: React.FC<Props> = ({ todayColor = 'rgba(252, 248, 227, 0.5)' }) => {
  const { totalWidth, rowCount, dates, columnWidth, viewMode } = useAppSelector(
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

  let tickX = 0
  let ticks = []
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

    tickX += columnWidth
  }

  return (
    <g className="gridBody">
      <g className="rows">{gridRows}</g>
      <g className="rowLines">{rowLines}</g>
      <g className="ticks">{ticks}</g>
    </g>
  )
}

export default Grid
