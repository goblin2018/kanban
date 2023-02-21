import { moveTaskGroup, TaskGroup } from 'api/taskgroup'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTaskGroups } from 'reducers/projectSlice'
import TaskItem from '../task'
import NewTaskItem from '../task/newTask'
import TaskgroupHeader from './header'
import {
  groupMargin,
  groupPadding,
  groupTotalWidth,
  groupWidth,
} from '../constants'
import { HddOutlined } from '@ant-design/icons'

interface Props {
  taskgroup: TaskGroup
  idx: number
}

let hold = document.createElement('div')
hold.id = 'hold'
hold.style.width = `${groupWidth}px`
hold.style.marginLeft = `${groupMargin}px`
hold.style.background = '#bccced'
hold.style.border = '1px solid #ababab'
hold.style.borderRadius = '12px'

const TaskGroupItem: React.FC<Props> = ({ taskgroup, idx }) => {
  const [diff, setDiff] = useState({ x: 0, y: 0 })

  const [currentIdx, setCurrentIdx] = useState(0)
  const [originIdx, setOriginIdx] = useState(0)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const dispatch = useAppDispatch()

  const [draggable, setDraggable] = useState(false)
  const parent = document.getElementById('groups-container')!
  const item = document.getElementById(`taskgroup-${idx}`)!

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (parent.lastChild == item) {
      parent.appendChild(hold)
    } else {
      parent.insertBefore(hold, item.nextSibling)
    }

    setPosition({ x: item.offsetLeft, y: item.offsetTop })
    console.log('start position ', item.offsetLeft, item.offsetHeight)

    setDiff({
      x: e.clientX - item.offsetLeft,
      y: e.clientY - item.offsetTop,
    })

    item.style.position = 'absolute'
    item.style.zIndex = '999'
    item.style.marginLeft = '0'
    item.style.boxShadow = '0px 16px 48px rgba(17, 38, 82, 0.16)'

    // t.parentElement.ap

    let idx = Math.floor((e.clientX - parent!.offsetLeft) / groupTotalWidth)
    setCurrentIdx(idx)
    setOriginIdx(idx)

    // t.offsetLeft
    console.log('drag start ' + idx)
  }

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({
      x: e.clientX - diff.x,
      y: e.clientY - diff.y,
    })

    let newIdx = Math.floor((e.clientX - parent!.offsetLeft) / groupTotalWidth)

    newIdx =
      newIdx <= parent!.childElementCount ? newIdx : parent!.childElementCount
    if (newIdx != currentIdx) {
      // hold.remove()
      parent?.removeChild(hold)

      if (newIdx > originIdx) {
        if (newIdx == parent!.childElementCount) {
          parent!.appendChild(hold)
        } else {
          parent!.insertBefore(hold, parent!.children[newIdx + 1])
        }
      } else {
        parent!.insertBefore(hold, parent!.children[newIdx])
      }

      console.log('newIdx , ', newIdx, 'currentIdx ', currentIdx)

      setCurrentIdx(newIdx)
    }
    // console.log('idx ', newIdx)

    // console.log('test1 ', document.getElementById('test1')?.clientHeight)
    // console.log('test2 ', document.getElementById('test2')?.clientHeight)
  }

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setPosition({ x: 0, y: 0 })
    item.style.position = 'relative'
    item.style.zIndex = '1'

    item.style.marginLeft = `${groupMargin}px`
    parent?.removeChild(hold)

    if (originIdx == currentIdx) {
      return
    }
    // t.parentElement?.replaceChild(t, hold)

    // 请求后端重新排序

    let tgs = [...taskGroups]

    let origin = tgs[originIdx]
    tgs.splice(originIdx, 1)
    tgs.splice(currentIdx, 0, origin)

    dispatch(setTaskGroups(tgs))
    console.log('tgs after', tgs)

    let prev, next
    if (currentIdx == 0) {
      prev = 0
      next = tgs[currentIdx + 1].id
    } else if (currentIdx == tgs.length - 1) {
      next = 0
      prev = tgs[currentIdx - 1].id
    } else {
      prev = tgs[currentIdx - 1].id
      next = tgs[currentIdx + 1].id
    }

    console.log(prev, next)

    moveTaskGroup({
      id: origin.id!,
      projectId: origin.projectId!,
      prev: prev,
      next: next,
    }).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div
      className={`border h-full cursor-pointer bg-blue-50 flex-shrink-0 ml-2  rounded-xl`}
      draggable={draggable}
      style={{
        left: position.x,
        top: position.y,
        position: 'relative',
        width: groupWidth,
      }}
      id={`taskgroup-${idx}`}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDragEnd={onDragEnd}
    >
      <TaskgroupHeader taskgroup={taskgroup} setDraggable={setDraggable} />

      <div
        id={`task-container-${idx}`}
        className={`overflow-y-scroll max-h-[calc(100%-120px)] 
        scrollbar-thin scrollbar-thumb-blue-200 
         scrollbar-thumb-rounded-full
         scrollbar-track-blue-50  relative overflow-x-hidden`}
        style={{ paddingLeft: groupPadding }}
      >
        {taskgroup.tasks?.map((t, i) => (
          <TaskItem
            task={t}
            key={`task-${taskgroup.id}-${i}`}
            groupIdx={idx}
            idx={i}
          />
        ))}
      </div>
      <div className="relative">
        <NewTaskItem
          taskgroup={taskgroup}
          groupIdx={idx}
          atBottom={taskgroup.tasks && taskgroup.tasks.length > 3}
        />
      </div>
    </div>
  )
}

export default TaskGroupItem
