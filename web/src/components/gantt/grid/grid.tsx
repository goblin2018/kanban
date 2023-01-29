import { Task } from '../types'
import styles from './grid.module.css'
import { addToDate } from '../date'

interface Props {
  tasks: Task[]
  dates: Date[]
  svgWidth: number
  rowHeight: number
  columnWidth: number
  todayColor: string
}
const Grid: React.FC<Props> = ({
  tasks,
  dates,
  svgWidth,
  rowHeight,
  columnWidth,
  todayColor,
}) => {
  let y = 0
  let gridRows = []
  const rowLines = [
    <line
      key="RowLineFirst"
      x="0"
      y1={0}
      x2={svgWidth}
      y2={0}
      className={styles.gridRowLine}
    />,
  ]

  for (const t of tasks) {
    gridRows.push(
      <rect
        key={`row${t.id}`}
        x="0"
        y={y}
        width={svgWidth}
        height={rowHeight}
        className={styles.gridRow}
      />
    )
    rowLines.push(
      <line
        key={`RowLine` + t.id}
        x="0"
        y1={y + rowHeight}
        x2={svgWidth}
        y2={y + rowHeight}
        className={styles.gridRowLine}
      />
    )
    y += rowHeight
  }

  const now = new Date()
  let tickX = 0
  let ticks = []
  let today = <rect />
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    ticks.push(
      <line
        key={date.getTime()}
        x1={tickX}
        y1={0}
        x2={tickX}
        y2={y}
        className={styles.gridTick}
      />
    )

    if (
      (i + 1 !== dates.length &&
        date.getTime() < now.getTime() &&
        dates[i + 1].getTime() >= now.getTime()) ||
      // if current date is last
      (i !== 0 &&
        i + 1 === dates.length &&
        date.getTime() < now.getTime() &&
        addToDate(
          date,
          date.getTime() - dates[i - 1].getTime(),
          'millisecond'
        ).getTime() >= now.getTime())
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
