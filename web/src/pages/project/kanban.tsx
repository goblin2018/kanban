import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useEffect } from 'react'
import { listTaskGroup } from 'reducers/projectSlice'
import TaskGroupItem from './taskgroup'

const Kanban = () => {
  const taskGroups = useAppSelector((s) => s.project.taskGroups)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(listTaskGroup())
  }, [])

  return (
    <div className="h-full">
      <div id="groups-dragging-container"></div>
      <div className="flex h-full" id="groups-container">
        {taskGroups.map((tg, idx) => (
          <TaskGroupItem taskgroup={tg} key={`taskgroup${idx}`} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default Kanban
