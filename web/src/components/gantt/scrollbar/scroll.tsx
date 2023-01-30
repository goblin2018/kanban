import { SyntheticEvent, useEffect, useRef } from 'react'
import styles from './scroll.module.css'

interface Props {
  scroll: number
  svgWidth: number
  taskListWidth: number
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void
}

const HorizontalScroll: React.FC<Props> = ({
  scroll,
  svgWidth,
  taskListWidth,
  onScroll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scroll
    }
  }, [scroll])

  return (
    <div
      style={{ margin: `0 0 0 ${taskListWidth}px` }}
      className={styles.scrollWrapper}
      onScroll={onScroll}
      ref={scrollRef}
    >
      <div style={{ width: svgWidth }} className={styles.scroll}></div>
    </div>
  )
}

export default HorizontalScroll
