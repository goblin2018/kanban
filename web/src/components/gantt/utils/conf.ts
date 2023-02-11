import { ViewMode } from './types'

export const preStepsCount = 1
export const rowHeight = 50
export const taskHeight = rowHeight * 0.6
export const barCornerRadius = 4
export const handleWidth = 8
export const handleHeight = taskHeight - 2
export const headerHeight = 60
export const calendarTopHeight = headerHeight * 0.5

export const barProgressColor = '#a3a3ff'
export const barProgressSelectedColor = '#8282f5'
export const barBackgroundColor = '#7db59a'
export const barBackgroundSelectedColor = '#59a985'
export const projectProgressColor = '#7db59a'
export const projectProgressSelectedColor = '#59a985'
export const projectBackgroundColor = '#fac465'
export const projectBackgroundSelectedColor = '#f7bb53'
export const milestoneBackgroundColor = '#f1c453'
export const milestoneBackgroundSelectedColor = '#f29e4c'

export const ColumnWidthConf = {
  [ViewMode.Year]: 365,
  [ViewMode.Month]: 300,
  [ViewMode.Week]: 210,
  [ViewMode.Day]: 65,
}

export const StepWidth = {
  [ViewMode.Week]: ColumnWidthConf[ViewMode.Week] / 7,
  [ViewMode.Day]: ColumnWidthConf[ViewMode.Day],
  [ViewMode.Month]: ColumnWidthConf[ViewMode.Month] / 30,
  [ViewMode.Year]: 5,
}
