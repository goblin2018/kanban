import { Button, Card } from 'antd'
import { moveTaskGroup, TaskGroup } from 'api/taskgroup'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setCurrentProject } from 'pages/project/projectSlice'
import TaskItem from './task'
import NewTaskItem from './newTask'

interface Props {
  taskgroup: TaskGroup
}

let hold = document.createElement('div')
hold.id = 'hold'
hold.style.width = '220px'
hold.style.background = '#1f66ba'

const TaskGroupItem: React.FC<Props> = ({ taskgroup }) => {
  const [diff, setDiff] = useState({ x: 0, y: 0 })

  const [currentIdx, setCurrentIdx] = useState(0)
  const [originIdx, setOriginIdx] = useState(0)

  const [position, setPosition] = useState({ x: 0, y: 0 })

  const project = useAppSelector((s) => s.project.current)
  const dispatch = useAppDispatch()

  const [draggable, setDraggable] = useState(false)
  const item = useRef<HTMLDivElement>(null)

  const [parent, setParent] = useState<HTMLElement | null>(null)

  useEffect(() => {
    let p = item.current!
    setParent(p.parentElement)
  }, [])

  return (
    <div
      className="w-[220px] border h-[600px] p-4 cursor-pointer bg-white"
      draggable={draggable}
      style={{
        left: position.x,
        top: position.y,
        position: 'relative',
      }}
      ref={item}
      onDragStart={(e) => {
        // console.log(e)
        if (parent!.lastChild == item.current!) {
          parent!.appendChild(hold)
        } else {
          parent!.insertBefore(hold, item.current!.nextSibling)
        }

        setPosition({ x: item.current!.offsetLeft, y: item.current!.offsetTop })
        console.log(
          'start position ',
          item.current!.offsetLeft,
          item.current!.offsetHeight
        )

        setDiff({
          x: e.clientX - item.current!.offsetLeft,
          y: e.clientY - item.current!.offsetTop,
        })
        item.current!.style.position = 'absolute'
        // t.style.background = '#aa0000'

        // t.parentElement.ap

        let idx = Math.floor((e.clientX - parent!.offsetLeft) / 220)
        setCurrentIdx(idx)
        setOriginIdx(idx)

        // t.offsetLeft
        console.log('drag start ' + idx)
      }}
      onDrag={(e) => {
        setPosition({
          x: e.clientX - diff.x,
          y: e.clientY - diff.y,
        })

        let newIdx = Math.floor((e.clientX - parent!.offsetLeft) / 220)

        newIdx =
          newIdx <= parent!.childElementCount
            ? newIdx
            : parent!.childElementCount
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

        // console.log('position ', e.clientX, e.clientY)
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      onDrop={(e) => {
        console.log('on drop origin, ', originIdx, 'current, ', currentIdx)
        console.log(e.target)

        setPosition({ x: 0, y: 0 })
        item.current!.style.position = 'relative'
        parent?.removeChild(hold)

        if (originIdx == currentIdx) {
          return
        }
        // t.parentElement?.replaceChild(t, hold)

        // 请求后端重新排序

        let tgs = [...project?.taskGroups!]

        let origin = tgs[originIdx]
        tgs.splice(originIdx, 1)
        tgs.splice(currentIdx, 0, origin)

        dispatch(setCurrentProject({ ...project, taskGroups: tgs }))
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
          projectId: project?.id!,
          prev: prev,
          next: next,
        }).then((res) => {
          console.log(res.data)
        })
      }}
    >
      <div
        className="text-xl mb-4"
        onMouseEnter={(e) => {
          setDraggable(true)
        }}
        onMouseLeave={(e) => {
          setDraggable(false)
        }}
      >
        {taskgroup.name}
      </div>
      <div>
        {taskgroup.tasks?.map((t, idx) => (
          <TaskItem task={t} key={`task-${taskgroup.id}-${idx}`} />
        ))}
      </div>
      <div>
        <NewTaskItem />
      </div>
    </div>
  )
}

export default TaskGroupItem
