import { GanttTask } from 'components/gantt/utils/types'
import {
  barBackgroundColor,
  barBackgroundSelectedColor,
  barCornerRadius,
  handleWidth,
  StepWidth,
  taskHeight,
} from 'components/gantt/utils/conf'

import styles from './bar.module.css'
import DateHandle from './date-handle'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { HoldPositionType, setHold, setTasks } from 'reducers/ganttSlice'
import { xToDate } from 'components/gantt/utils/date'
import { updateTask } from 'api/task'
import { setTaskGroups } from 'reducers/projectSlice'
interface Props {
  task: GanttTask
  isSelected: boolean
}

const Bar: React.FC<Props> = ({ task, isSelected }) => {
  const { diffX, viewMode, dates, tasks } = useAppSelector((s) => s.gantt)
  const { position, index, reset } = useAppSelector((s) => s.gantt.hold)
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const isHolding = useMemo(() => index == task.index, [index])
  const dispatch = useAppDispatch()

  const [start, setStart] = useState(task.barInfo!.x1!)
  const [end, setEnd] = useState(task.barInfo!.x2!)
  useEffect(() => {
    let barInfo = task.barInfo!
    setStart(barInfo.x1!)
    setEnd(barInfo.x2!)
  }, [task])

  const startDate = useMemo(
    () => xToDate(start, dates[0], viewMode),
    [start, viewMode, dates]
  )

  const endDate = useMemo(
    () => xToDate(end, dates[0], viewMode),
    [end, viewMode, dates]
  )

  useEffect(() => {
    if (!isHolding) {
      return
    }
    if (!reset) {
      return
    }
    if (task.start?.isSame(startDate) && task.end?.isSame(endDate)) {
      dispatch(setHold({ index: -1, reset: false }))
      return
    }
    updateTasks()
    dispatch(setHold({ index: -1, reset: false }))
  }, [reset, isHolding])

  const updateTasks = () => {
    updateTask({
      id: task.id,
      startAt: startDate.format(),
      endAt: endDate.format(),
    })

    let tgs = [...taskGroups]
    if (typeof task.previousIndex != 'number') {
      let tg = { ...tgs[task.previousIndex[0]] }
      let ts = [...tg.tasks!]
      let t = {
        ...ts[task.previousIndex[1]],
        start: startDate.format(),
        end: endDate.format(),
      }
      ts[task.previousIndex[1]] = t
      tg.tasks = ts
      tgs[task.previousIndex[0]] = { ...tg }
      dispatch(setTaskGroups(tgs))
    }

    let groupTask = { ...tasks[task.parentIndex!] }
    let groupBarInfo = { ...groupTask.barInfo! }
    let groupStart = start
    let groupEnd = end

    let i = task.parentIndex! + 1
    while (i < tasks.length && tasks[i].parentIndex! == task.parentIndex!) {
      let t = tasks[i]
      i += 1
      if (t.index == index) {
        continue
      }
      if (t.barInfo!.x1) {
        let bi = t.barInfo!
        if (bi.x1! < groupStart) {
          groupStart = bi.x1!
        }
        if (bi.x2! > groupEnd) {
          groupEnd = bi.x2!
        }
      }
    }
    groupBarInfo = { ...groupBarInfo, x1: groupStart, x2: groupEnd }
    groupTask.barInfo = groupBarInfo

    let ts = [...tasks]
    let barInfo = task.barInfo!
    ts[task.index] = {
      ...task,
      start: startDate,
      end: endDate,
      barInfo: { ...barInfo, x1: start, x2: end },
    }

    ts[task.parentIndex!] = groupTask
    dispatch(setTasks(ts))
  }

  useEffect(() => {
    if (!isHolding) {
      return
    }

    let barInfo = task.barInfo!
    let newStart
    let newEnd
    let stepWidth = StepWidth[viewMode]
    switch (position) {
      case 'start':
        newStart = barInfo.x1! + diffX
        newStart =
          newStart > barInfo.x2! - stepWidth
            ? barInfo.x2! - stepWidth
            : newStart
        setStart(newStart)
        break
      case 'end':
        newEnd = barInfo.x2! + diffX
        newEnd =
          newEnd > barInfo.x1! + stepWidth ? newEnd : barInfo.x1! + stepWidth
        setEnd(newEnd)
        break
      case 'all':
        newStart = barInfo.x1! + diffX
        newEnd = barInfo.x2! + diffX
        setEnd(newEnd)
        setStart(newStart)
        break
    }
  }, [isHolding, diffX])

  const setHoldPoint = (p: HoldPositionType) => {
    dispatch(setHold({ index: task.index, position: p }))
  }

  const getBarColor = () => {
    return isSelected ? barBackgroundSelectedColor : barBackgroundColor
  }

  const textRef = useRef<SVGTextElement>(null)

  const isTextInside = useMemo(() => {
    if (!textRef.current) {
      return false
    }
    let t = textRef.current

    return t.getBBox().width < end - start
  }, [textRef.current, end, start])

  const isHintTextInside = useMemo(() => {
    return end - start > 120
  }, [start, end])

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      {/* hint info */}
      <g>
        <rect
          x={start}
          y={task.barInfo!.y! - 35}
          width={end - start}
          height={30}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={'green'}
          className={` flex`}
        ></rect>
        <text
          x={isHintTextInside ? start + 10 : end + 10}
          y={task.barInfo!.y! - 15}
          fill={isHintTextInside ? '#fff' : '#555'}
        >
          {startDate.format('MM-DD')}
        </text>
        <text
          x={isHintTextInside ? end - 50 : end + 60}
          y={task.barInfo!.y! - 15}
          fill={isHintTextInside ? '#fff' : '#555'}
        >
          {endDate.format('MM-DD')}
        </text>
      </g>

      <rect
        x={start}
        y={task.barInfo!.y}
        width={end - start}
        height={taskHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={styles.barBackground}
      />
      <text
        x={(isTextInside ? start : end) + 12}
        y={task.barInfo!.y! + taskHeight * 0.65}
        style={{
          fill: isTextInside ? '#fff' : '#555',
        }}
        ref={textRef}
      >
        {task.name}
      </text>

      <g className="hanldeGroup">
        {/* left */}
        <DateHandle
          x={start + 1}
          y={task.barInfo!.y! + 1}
          setHold={() => setHoldPoint('start')}
        />
        {/* right */}
        <DateHandle
          x={end - handleWidth - 1}
          y={task.barInfo!.y! + 1}
          setHold={() => setHoldPoint('end')}
        />
      </g>
    </g>
  )
}

export default Bar
