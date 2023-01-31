import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ColumnWidthConf } from './utils/conf'
import { GanttTask, ViewMode } from './utils/types'

interface GanttState {
  viewMode: ViewMode
  tasks: GanttTask[]
  dates: Date[]
  columnWidth: number
  totalWidth: number
  rowCount: number
  hold: number
  diffX: number
}

const initialState: GanttState = {
  viewMode: ViewMode.Day,
  tasks: [],
  dates: [],
  columnWidth: ColumnWidthConf[ViewMode.Day],
  totalWidth: 0,
  rowCount: 0,
  hold: -1,
  diffX: 0,
}

const ganttSlice = createSlice({
  name: 'gantt',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload
      state.columnWidth = ColumnWidthConf[state.viewMode]
    },
    setTasks: (state, action: PayloadAction<GanttTask[]>) => {
      state.tasks = action.payload
    },
    setDates: (state, action: PayloadAction<Date[]>) => {
      state.dates = action.payload
      state.totalWidth = state.dates.length * state.columnWidth
    },
    setRowCount: (state, action: PayloadAction<number>) => {
      state.rowCount = action.payload
    },
    setHold: (state, action: PayloadAction<number>) => {
      state.hold = action.payload
    },
    setDiffX: (state, action: PayloadAction<number>) => {
      state.diffX = action.payload
    },
  },
})

export const {
  setViewMode,
  setTasks,
  setDates,
  setRowCount,
  setHold,
  setDiffX,
} = ganttSlice.actions
export default ganttSlice.reducer
