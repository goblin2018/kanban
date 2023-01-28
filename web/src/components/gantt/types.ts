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

export type TaskType = 'task' | 'milestone' | 'project'

export interface Task {
  id: string
  type: TaskType
  name: string
  start: Date
  end: Date
  // 0-100
  progress: number
  styles?: {
    backgroundColor?: string
    backgroundSelectedColor?: string
    progressColor?: string
    progressSelectedColor?: string
  }

  isDisabled?: boolean
  project?: string
  dependencies?: string[]
  hideChildren?: boolean
  displayOrder?: number
}
