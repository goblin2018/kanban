import styles from './bar.module.css'

interface Props {
  x: number
  y: number
  width: number
  height: number
  barCornerRadius: number
  onMouseDown: () => void
}

const DateHandle: React.FC<Props> = ({
  x,
  y,
  width,
  height,
  barCornerRadius,
  onMouseDown,
}) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      className={styles.barHandle}
      rx={barCornerRadius}
      ry={barCornerRadius}
      onMouseDown={onMouseDown}
    />
  )
}

export default DateHandle
