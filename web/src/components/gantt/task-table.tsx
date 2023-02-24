import { useAppDispatch, useAppSelector } from 'app/hooks'
import StatusTag from 'components/statustag'
import { headerHeight, rowHeight } from './utils/conf'
import { ReactComponent as DownArrow } from 'assets/down.svg'
import { setTasks } from 'reducers/ganttSlice'

const wDate = 60
const wTag = 60
const wInfo = 240

const TaskTable = () => {
  const { tasks, scrollTop } = useAppSelector((s) => s.gantt)
  const dispatch = useAppDispatch()

  return (
    <div className="bg-white cursor-pointer h-full">
      <div
        className="pl-6 pr-5 
         w-full bg-white flex items-end justify-between text-base text-text-disabled text-center"
        style={{ height: headerHeight, zIndex: 999 }}
      >
        <div className={`flex-shrink-0 text-left`} style={{ width: wInfo }}>
          任务名称
        </div>
        <div className={`flex-shrink-0`} style={{ width: wTag }}>
          开始
        </div>
        <div className={`flex-shrink-0`} style={{ width: wDate }}>
          状态
        </div>
        <div className={`flex-shrink-0`} style={{ width: wDate }}>
          结束
        </div>
      </div>

      <div
        className="pl-6 pr-5 h-full overflow-clip"
        style={{
          position: 'relative',
        }}
      >
        <div
          className="absolute"
          style={{
            top: -scrollTop,
            zIndex: 0,
          }}
        >
          {tasks.map((t, i) => (
            <div key={`taskname-${t.type == 'task' ? 't' : 'g'}-${t.id}`}>
              {t.hide ? (
                <div></div>
              ) : (
                <div
                  className="flex items-center justify-between rounded hover:bg-[#f5f7fa]"
                  style={{ height: rowHeight }}
                >
                  <div
                    className={`flex-shrink-0 text-ellipsis flex items-center`}
                    style={{ width: wInfo }}
                  >
                    {t.type == 'project' ? (
                      <DownArrow
                        onClick={() => {
                          // 设置hideChildren

                          let ts = [...tasks]
                          let nt = { ...t }
                          if (t.hideChildren) {
                            nt.hideChildren = false
                          } else {
                            nt.hideChildren = true
                          }

                          ts[i] = nt
                          for (let j = i + 1; j < ts.length; j++) {
                            let item = { ...ts[j] }
                            if (item.type == 'project') {
                              break
                            } else {
                              item.hide = nt.hideChildren
                              ts[j] = item
                            }
                          }
                          console.log('ts ', ts[7].hide)

                          dispatch(setTasks([...ts]))
                        }}
                        className={`mx-1 hover:text-blue-500 ${
                          t.hideChildren ? '-rotate-90' : ''
                        } `}
                      />
                    ) : (
                      <div className="w-8"></div>
                    )}
                    {t.name}
                  </div>
                  <div className={`flex-shrink-0`} style={{ width: wTag }}>
                    {t.type == 'task' && <StatusTag status={t.status} />}
                  </div>
                  <div
                    className={`flex-shrink-0 text-center`}
                    style={{ width: wDate }}
                  >
                    {t.start?.format('MM-DD')}
                  </div>
                  <div
                    className={`flex-shrink-0 text-center`}
                    style={{ width: wDate }}
                  >
                    {t.end?.format('MM-DD')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskTable
