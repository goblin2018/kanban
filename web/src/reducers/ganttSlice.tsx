import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { updateTask } from 'api/task'
import { Dayjs } from 'dayjs'
import { ColumnWidthConf } from '../components/gantt/utils/conf'
import { GanttTask, ViewMode } from '../components/gantt/utils/types'

export interface HoldType {
  index?: number
  position?: HoldPositionType
  reset?: boolean
}

export type HoldPositionType = 'start' | 'end' | 'all'
export interface GanttState {
  viewMode: ViewMode
  tasks: GanttTask[]
  dates: Dayjs[]
  columnWidth: number
  totalWidth: number
  rowCount: number
  hold: HoldType
  diffX: number
  scrollLeft: number
  scrollTop: number
}

const initialState: GanttState = {
  viewMode: ViewMode.Day,
  tasks: [],
  dates: [],
  columnWidth: ColumnWidthConf[ViewMode.Day],
  totalWidth: 0,
  rowCount: 0,
  hold: { index: -1 },
  diffX: 0,
  scrollLeft: 0,
  scrollTop: 0,
}

const ganttSlice = createSlice({
  name: 'gantt',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      if (state.viewMode != action.payload) {
        state.scrollLeft = 0
      }
      state.viewMode = action.payload
      state.columnWidth = ColumnWidthConf[state.viewMode]
    },
    setTasks: (state, action: PayloadAction<GanttTask[]>) => {
      state.tasks = action.payload
      state.rowCount = state.tasks.length
    },
    setDates: (state, action: PayloadAction<Dayjs[]>) => {
      state.dates = action.payload
      state.totalWidth = state.dates.length * state.columnWidth
    },

    setHold: (state, action: PayloadAction<HoldType>) => {
      if (action.payload.reset && state.hold.index == -1) {
        return
      }

      if (state.hold.reset && !action.payload.reset) {
        state.diffX = 0
      }
      state.hold = { ...state.hold, ...action.payload }
    },

    setDiffX: (state, action: PayloadAction<number>) => {
      state.diffX = action.payload
    },
    setScrollLeft: (state, action: PayloadAction<number>) => {
      state.scrollLeft = action.payload
    },
    setScrollTop: (state, action: PayloadAction<number>) => {
      state.scrollTop = action.payload
    },
  },
})

export const {
  setViewMode,
  setTasks,
  setDates,
  setHold,
  setDiffX,
  setScrollLeft,
  setScrollTop,
} = ganttSlice.actions
export default ganttSlice.reducer
