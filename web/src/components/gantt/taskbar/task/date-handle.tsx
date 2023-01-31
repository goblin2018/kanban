import {
  barCornerRadius,
  handleHeight,
  handleWidth,
} from 'components/gantt/utils/conf'
import styles from './bar.module.css'

interface Props {
  x: number
  y: number
  setHold: () => void
}

const DateHandle: React.FC<Props> = ({ x, y, setHold }) => {
  return (
    <rect
      x={x}
      y={y}
      width={handleWidth}
      height={handleHeight}
      className={styles.barHandle}
      rx={barCornerRadius}
      ry={barCornerRadius}
      onMouseDown={(e) => {
        setHold()
      }}
    />
  )
}

export default DateHandle
