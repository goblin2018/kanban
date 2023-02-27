import { useAppSelector } from 'app/hooks'
import dayjs from 'dayjs'
import { ColumnWidthConf, rowHeight } from './utils/conf'
import { taskXCoordinate } from './utils/task'

const Today = () => {
  const { dates, viewMode, scrollTop } = useAppSelector((s) => s.gantt)

  let dx =
    taskXCoordinate(dayjs(), dates, viewMode) + ColumnWidthConf[viewMode] / 2
  return (
    <div
      className="absolute flex flex-col items-center h-[calc(100%-40px)]"
      style={{
        left: dx,
        zIndex: 50,
        top: scrollTop + 34,
        width: 0,
      }}
    >
      <div className="bg-[#ffaa47] text-white rounded-full w-6 h-6 text-center">
        今
      </div>
      <div className="w-px bg-[#ffaa47] h-[calc(100%-24px)]"></div>
    </div>
  )
}

export default Today
