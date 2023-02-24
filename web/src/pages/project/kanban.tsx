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
    <div className="h-full  relative mt-4">
      <div id="groups-dragging-container"></div>
      <div
        className="flex h-full pb-[10px] pr-[100px] overflow-y-hidden relative 
        scrollbar-thin scrollbar-thumb-blue-200 
         scrollbar-thumb-rounded-full
         scrollbar-track-blue-50  "
        id="groups-container"
      >
        {taskGroups.map((tg, idx) => (
          <TaskGroupItem taskgroup={tg} key={`taskgroup${idx}`} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default Kanban
