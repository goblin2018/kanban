import { GanttTask } from 'components/gantt/utils/types'
import {
  barBackgroundColor,
  barBackgroundSelectedColor,
  barCornerRadius,
  handleWidth,
  rowHeight,
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
  rowIdx: number
}

const Bar: React.FC<Props> = ({ task, isSelected, rowIdx }) => {
  const { diffX, viewMode, dates, tasks } = useAppSelector((s) => s.gantt)
  const { position, index, reset } = useAppSelector((s) => s.gantt.hold)
  const { taskGroups, canEdit } = useAppSelector((s) => s.project)
  const isHolding = useMemo(() => index == task.index, [index])
  const y = rowIdx * rowHeight + (rowHeight - taskHeight) / 2
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
    let startD = startDate.add(8, 'h').format()
    let endD = endDate.add(8, 'h').format()
    updateTask({
      id: task.id,
      startAt: startD,
      endAt: endD,
    })

    let tgs = [...taskGroups]
    if (typeof task.previousIndex != 'number') {
      let tg = { ...tgs[task.previousIndex[0]] }
      let ts = [...tg.tasks!]
      let t = {
        ...ts[task.previousIndex[1]],
        startAt: startD,
        endAt: endD,
      }
      ts[task.previousIndex[1]] = t
      tg.tasks = ts
      tgs[task.previousIndex[0]] = { ...tg }

      console.log(
        'get new tgs ',
        task.previousIndex,
        tgs[task.previousIndex[0]]
      )

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
    return task.barInfo?.color
    // return isSelected ? barBackgroundSelectedColor : barBackgroundColor
  }

  const textRef = useRef<SVGTextElement>(null)

  const isTextInside = useMemo(() => {
    if (!textRef.current) {
      return false
    }
    let t = textRef.current

    return t.getBBox().width + 30 < end - start
  }, [textRef.current, end, start])

  const isHintTextInside = useMemo(() => {
    return end - start > 120
  }, [start, end])

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      {/* hint info */}

      {isHolding && (
        <g>
          <rect
            x={start}
            y={y - 35}
            width={end - start}
            height={30}
            ry={barCornerRadius}
            rx={barCornerRadius}
            fill={'#ffc107'}
            className={` flex`}
          ></rect>
          <text
            x={isHintTextInside ? start + 10 : end + 10}
            y={y - 15}
            fill={'#000'}
          >
            {startDate.format('MM-DD')}
          </text>
          <text
            x={isHintTextInside ? end - 50 : end + 60}
            y={y - 15}
            fill={'#000'}
          >
            {endDate.format('MM-DD')}
          </text>
        </g>
      )}

      <rect
        x={start}
        y={y}
        width={end - start}
        height={taskHeight}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        fillOpacity={0.4}
        stroke={getBarColor()}
        strokeWidth={1}
        strokeOpacity={1}
      />
      <text
        x={(isTextInside ? start : end) + 14}
        y={y + taskHeight * 0.68}
        style={{
          fill: isTextInside ? '#000' : '#555',
        }}
        ref={textRef}
      >
        {task.name} - {task.end?.diff(task.start, 'day')} Days
      </text>

      {canEdit && (
        <g className="hanldeGroup">
          {/* left */}
          <DateHandle
            x={start + 1}
            y={y + 1}
            setHold={() => setHoldPoint('start')}
          />
          {/* right */}
          <DateHandle
            x={end - handleWidth - 1}
            y={y + 1}
            setHold={() => setHoldPoint('end')}
          />
        </g>
      )}
    </g>
  )
}

export default Bar
