import { moveTask, Task } from 'api/task'
import { toShortDate } from 'api/utils'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setTaskGroups } from 'reducers/projectSlice'
import { DragEventHandler, useEffect, useRef, useState } from 'react'
import { setEditTask } from '../../../reducers/taskSlice'
import { ReactComponent as CommentSvg } from './comment.svg'
import StatusTag from 'components/statustag'
import {
  groupTotalWidth,
  taskHeight,
  taskMargin,
  taskTotalHeight,
  taskWidth,
} from '../constants'

interface Props {
  task: Task
  idx: number
  groupIdx: number
}

let hold = document.createElement('div')
hold.id = 'holdtask'
hold.style.width = `${taskWidth}px`
hold.style.height = `${taskHeight}px`
hold.style.marginBottom = `${taskMargin}px`
hold.style.background = '#bccced'
hold.style.border = '1px solid #ababab'
hold.style.borderRadius = '12px'

const TaskItem: React.FC<Props> = ({ task, idx, groupIdx }) => {
  const dispatch = useAppDispatch()
  const [draggable, setDraggable] = useState(false)
  const taskGroups = useAppSelector((s) => s.project.taskGroups)

  const item = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [diff, setDiff] = useState({ x: 0, y: 0 })

  const containerLeft = document.getElementById('groups-container')?.offsetLeft

  const [originParent, setOriginParent] = useState<HTMLElement | null>(null)
  const [currentParent, setCurrentParent] = useState<HTMLElement | null>(null)
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0)
  const [currentIdx, setCurrentIdx] = useState(0)

  const [direction, setDirection] = useState<'up' | 'down' | 'none'>('none')

  useEffect(() => {
    let p = item.current!
    setOriginParent(p.parentElement)
  }, [])

  const dragStart: DragEventHandler = (e) => {
    e.stopPropagation()
    setCurrentParent(originParent)
    setDirection('none')

    setCurrentIdx(idx)
    setCurrentGroupIdx(groupIdx)

    if (originParent!.lastChild == item.current!) {
      originParent?.appendChild(hold)
    } else {
      console.log('insert hold')

      originParent?.insertBefore(hold, item.current!.nextSibling)
    }

    setPosition({
      x: item.current!.offsetLeft,
      y: item.current!.offsetTop,
    })
    setDiff({
      x: e.clientX - item.current!.offsetLeft,
      y: e.clientY + originParent!.scrollTop - item.current!.offsetTop,
    })

    item.current!.style.position = 'absolute'
  }

  const onDrag: DragEventHandler = (e) => {
    e.stopPropagation()

    // 计算位置 看是否有变化

    setPosition({
      x: e.clientX - diff.x,
      y: e.clientY + currentParent!.scrollTop - diff.y,
    })

    // 水平方向， 以最外层为参考
    let newParentIdx = Math.floor(
      (e.clientX - containerLeft!) / groupTotalWidth
    )

    newParentIdx =
      newParentIdx <= taskGroups.length - 1
        ? newParentIdx
        : taskGroups.length - 1

    // 垂直方向 以父元素为参考

    let pt = originParent!.getBoundingClientRect().top
    let newIdx = Math.round(
      (e.clientY + currentParent!.scrollTop - pt) / taskTotalHeight
    )

    // console.log(
    //   'item ',
    //   item.current?.getBoundingClientRect(),
    //   'parent ',
    //   currentParent?.scrollTop
    // )

    let newGroup = taskGroups[newParentIdx]
    let newGroupTasksCount = newGroup?.tasks ? newGroup.tasks.length : 0
    newIdx = newIdx <= newGroupTasksCount ? newIdx : newGroupTasksCount

    if (newParentIdx == currentGroupIdx && newIdx == currentIdx) {
      return
    }

    currentParent?.removeChild(hold)

    // 如果在当前的组内
    if (newParentIdx == currentGroupIdx) {
      console.log('change position newIdx: ', newIdx, 'currentIdx', currentIdx)

      // 只是上下位置发生变化
      if (newIdx > currentIdx) {
        if (newIdx == currentParent?.childElementCount) {
          currentParent.appendChild(hold)
        } else {
          if (newParentIdx == groupIdx) {
            let add = false
            if (direction == 'none') {
              setDirection('down')
              add = true
            }
            add = add || direction == 'down'

            currentParent?.insertBefore(
              hold,
              currentParent.children[newIdx + (add ? 1 : 0)]
            )
          } else {
            console.log(
              'insert before 2',
              currentParent?.children[newIdx].children[0]
            )

            currentParent?.insertBefore(hold, currentParent.children[newIdx])
          }
        }
      } else {
        console.log(
          'insert before 3',
          currentParent?.children[newIdx].children[0]
        )
        if (direction == 'none') {
          setDirection('up')
        }

        currentParent?.insertBefore(
          hold,
          currentParent.children[newIdx + (direction == 'down' ? 1 : 0)]
        )
      }

      setCurrentIdx(newIdx)
    } else {
      // 位置和组别都发生变化
      let newParent = document.getElementById(`task-container-${newParentIdx}`)

      if (newIdx >= newParent!.childElementCount) {
        console.log('append child')

        newParent?.appendChild(hold)
      } else {
        console.log('insert before ', newParent?.children[newIdx])

        newParent?.insertBefore(hold, newParent.children[newIdx])
      }

      setCurrentIdx(newIdx)
      setCurrentGroupIdx(newParentIdx)
      setCurrentParent(newParent)
    }
  }

  const onDragEnd: DragEventHandler = (e) => {
    e.stopPropagation()
    // console.log('son drag end ', e.target)

    setPosition({ x: 0, y: 0 })
    console.log('current ', item.current)

    item.current!.style.position = 'relative'

    currentParent?.removeChild(hold)

    // 位置没变，不需要处理
    if (idx == currentIdx && groupIdx == currentGroupIdx) {
      return
    }

    // 请求后端重新排序
    let tgs = [...taskGroups]

    let currentTasks: Task[] = []
    // 当前组 更换位置
    if (groupIdx == currentGroupIdx) {
      let group = { ...tgs[groupIdx] }
      currentTasks = [...group.tasks!]
      let task = { ...currentTasks[idx] }
      currentTasks.splice(idx, 1)
      currentTasks.splice(currentIdx, 0, task)

      group.tasks = currentTasks
      tgs[groupIdx] = group

      // 调换位置
    } else {
      // 不同的分组
      let originGroup = { ...tgs[groupIdx] }
      let originTasks = [...originGroup.tasks!]
      let task = { ...originTasks[idx] }
      originTasks.splice(idx, 1)
      originGroup.tasks = originTasks
      tgs[groupIdx] = originGroup

      let currentGroup = { ...tgs[currentGroupIdx] }
      if (currentGroup.tasks) {
        currentTasks = [...currentGroup.tasks]
      } else {
        currentTasks = []
      }
      task.taskGroupId = currentGroup.id
      currentTasks.splice(currentIdx, 0, task)
      currentGroup.tasks = currentTasks
      tgs[currentGroupIdx] = currentGroup
    }

    dispatch(setTaskGroups([...tgs]))

    let [prev, next] = [0, 0]

    // 新增第一个
    if (currentTasks.length == 1) {
      prev = 0
      next = 0
    } else if (currentIdx == 0) {
      prev = 0
      next = currentTasks[currentIdx + 1].id!
    } else if (currentIdx == currentTasks.length - 1) {
      next = 0
      prev = currentTasks[currentIdx - 1].id!
    } else {
      prev = currentTasks[currentIdx - 1].id!
      next = currentTasks[currentIdx + 1].id!
    }

    moveTask({
      id: task.id!,
      prev: prev,
      next: next,
      taskGroupId: tgs[currentGroupIdx].id!,
    }).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div
      className="bg-white text-gray-600 rounded-xl flex flex-col"
      draggable={draggable}
      ref={item}
      style={{
        left: position.x,
        top: position.y,
        position: 'relative',
        height: taskHeight,
        width: taskWidth,
        marginBottom: taskMargin,
      }}
      onDragStart={dragStart}
      onDrag={onDrag}
      onDragOver={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }}
      onDragEnd={onDragEnd}
    >
      <div
        className="text-bold pt-4 mb-2 px-4"
        onMouseEnter={() => {
          setDraggable(true)
        }}
        onMouseLeave={() => {
          console.log('draggable false')

          setDraggable(false)
        }}
      >
        {task.name}
      </div>
      <div
        onClick={() => {
          dispatch(
            setEditTask({ task: task, groupIdx: groupIdx, taskIdx: idx })
          )
        }}
      >
        <div className="text-xs px-4 pb-1 text-text-disabled">
          <div className="flex">
            <div className="mr-2">开始时间</div>
            <div>{toShortDate(task.startAt)}</div>
          </div>
          <div className="flex">
            <div className="mr-2">结束时间</div>
            <div>{toShortDate(task.endAt)}</div>
          </div>
        </div>
        <div className="flex px-4 justify-between items-center">
          <div className="flex items-start">
            <CommentSvg className="mr-1" />
            <div>{task.commentCount == 0 ? '' : task.commentCount}</div>
          </div>
          <StatusTag status={task.status!} />
        </div>
      </div>
    </div>
  )
}

export default TaskItem
