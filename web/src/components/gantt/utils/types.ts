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

export type TaskType = 'task' | 'milestone' | 'project' | 'smalltask'

export interface Task {
  id: string
  type: TaskType
  name: string
  start: Date
  end: Date
  // 0-100
  isDisabled?: boolean
  project?: string
  dependencies?: string[]
  hideChildren?: boolean
  displayOrder?: number
}

export interface BarTask extends Task {
  index: number
  typeInternal: TaskTypeInternal
  x1: number
  x2: number
  y: number
  height: number

  handleWidth: number
  barChildren: BarTask[]
  styles: {
    backgroundColor: string
    backgroundSelectedColor: string
    progressColor: string
    progressSelectedColor: string
  }
}

export type TaskTypeInternal = TaskType | 'smalltask'
