import { useAppSelector } from 'app/hooks'
import TaskGroupItem from './taskgroup/taskgroup'

const Kanban = () => {
  const project = useAppSelector((s) => s.project.current!)

  return (
    <div>
      <div id="groups-dragging-container"></div>
      <div className="flex" id="groups-container">
        {project.taskGroups?.map((tg, idx) => (
          <TaskGroupItem taskgroup={tg} key={`taskgroup${idx}`} idx={idx} />
        ))}
      </div>
    </div>
  )
}

export default Kanban
