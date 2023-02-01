export enum ViewMode {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
  Year = 'Year',
}

export interface DateSetup {
  dates: Date[]
  viewMode: ViewMode
}

export type TaskType = 'task' | 'project'

export interface GanttTask {
  id: number
  name: string
  pIndex: number
  index: number
  type: TaskType
  start?: Date
  end?: Date
  hideChildren?: boolean

  barInfo?: {
    color: string
    x1?: number
    x2?: number
    y?: number
  }
}
