import { useAppSelector } from 'app/hooks'
import { headerHeight, rowHeight } from './utils/conf'

const TaskTable = () => {
  const tasks = useAppSelector((s) => s.gantt.tasks)
  return (
    <div>
      <div
        className="flex items-end justify-between"
        style={{ height: headerHeight }}
      >
        <div>任务名称</div>
        <div>开始时间</div>
        <div>结束时间</div>
      </div>
      {tasks.map((t) => (
        <div
          key={`taskname-${t.id}`}
          className="flex items-center justify-between"
          style={{ height: rowHeight }}
        >
          <div>{t.name}</div>
          <div>{t.start!.toLocaleDateString()}</div>
          <div>{t.end!.toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  )
}

export default TaskTable
