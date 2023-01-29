import style from './bar.module.css'
interface Props {
  onMouseDown: () => void
  x: number
  y: number
  width: number
  height: number
  isSelected: boolean
  progressX: number
  progressWidth: number
  barCornerRadius: number
  styles: {
    backgroundColor: string
    backgroundSelectedColor: string
    progressColor: string
    progressSelectedColor: string
  }
}
const BarDisplay: React.FC<Props> = ({
  onMouseDown,
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
}) => {
  const getProgressColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor
  }

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor
  }

  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.background}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProgressColor()}
      />
    </g>
  )
}

export default BarDisplay
