import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from 'api/task'

interface TaskState {
  current?: Task
  taskDrawerOpen?: boolean
  groupIdx?: number
  taskIdx?: number
}

const initialState: TaskState = { taskDrawerOpen: false }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setEditTask: (
      state,
      action: PayloadAction<{ task: Task; groupIdx: number; taskIdx: number }>
    ) => {
      state.current = action.payload.task
      state.groupIdx = action.payload.groupIdx
      state.taskIdx = action.payload.taskIdx
      state.taskDrawerOpen = true
    },
    closeTaskDrawer: (state) => {
      state.taskDrawerOpen = false
    },
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.current = action.payload
    },
  },
})

export const { setEditTask, closeTaskDrawer, setCurrentTask } = taskSlice.actions
export default taskSlice.reducer
