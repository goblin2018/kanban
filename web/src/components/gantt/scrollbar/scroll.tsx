import { useEffect, useRef } from 'react'
import styles from './scroll.module.css'

interface Props {
  scroll: number
  setScroll: (scroll: number) => void
  svgWidth: number
  taskListWidth: number
  width: number
}

const HorizontalScroll: React.FC<Props> = ({
  scroll,
  setScroll,
  svgWidth,
  taskListWidth,
  width,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scroll
    }
  }, [scroll])

  return (
    <div
      style={{ left: taskListWidth, width: width }}
      className={`${styles.scrollWrapper} fixed bottom-4`}
      onScroll={(e) => {
        setScroll(scrollRef.current!.scrollLeft)
      }}
      ref={scrollRef}
    >
      <div style={{ width: svgWidth }} className={styles.scroll}></div>
    </div>
  )
}

export default HorizontalScroll
