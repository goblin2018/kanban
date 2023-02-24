import { Dayjs } from 'dayjs'

export enum ViewMode {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export type TaskType = 'task' | 'project'

export interface GanttTask {
  id: number
  status: number
  name: string
  previousIndex: number | number[]
  parentIndex?: number
  index: number
  type: TaskType
  start?: Dayjs
  end?: Dayjs
  hideChildren?: boolean
  hide?: boolean

  barInfo?: {
    color: string
    x1?: number
    x2?: number
    y?: number
  }
}
