import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect, useRef } from 'react'
import { setScrollLeft } from 'reducers/ganttSlice'
import styles from './scroll.module.css'

interface Props {
  taskListWidth: number
  width: number
}

const HorizontalScroll: React.FC<Props> = ({ taskListWidth, width }) => {
  const { totalWidth, scrollLeft } = useAppSelector((s) => s.gantt)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft
    }
  }, [scrollLeft])

  return (
    <div
      style={{ left: taskListWidth, width: width }}
      className={`${styles.scrollWrapper} fixed bottom-4`}
      onScroll={(e) => {
        dispatch(setScrollLeft(scrollRef.current!.scrollLeft))
      }}
      ref={scrollRef}
    >
      <div style={{ width: totalWidth }} className={styles.scroll}></div>
    </div>
  )
}

export default HorizontalScroll
