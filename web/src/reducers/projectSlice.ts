import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from 'api/constatns'
import { lProjects, Project } from 'api/project'
import { lTaskGroup, TaskGroup } from 'api/taskgroup'

interface ProjectState {
  items: Project[]
  current: Project
  projectModalState: ModalState
  taskGroupModalState: ModalState
  taskGroups: TaskGroup[]
  page: PageOption
}

export type PageOption = 'kanban' | 'gantt'

export const listProjects = createAsyncThunk(
  'project/listProjects',
  async () => {
    const res = await lProjects()
    return res.data
  }
)

export const listTaskGroup = createAsyncThunk(
  'project/listTaskGroups',

  async (_, { getState }) => {
    const p = (getState() as { project: ProjectState }).project.current
    const res = await lTaskGroup({ projectId: p.id })

    return res.data.items || []
  }
)

const initialState: ProjectState = {
  items: [],
  current: {},
  taskGroups: [],
  page: 'kanban',
  projectModalState: 'close',
  taskGroupModalState: 'close',
}
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectItems: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload
    },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.current = action.payload
    },
    setTaskGroups: (state, action: PayloadAction<TaskGroup[]>) => {
      state.taskGroups = action.payload
    },
    setProjectModalState: (state, action: PayloadAction<ModalState>) => {
      state.projectModalState = action.payload
    },
    setTaskGroupModalState: (state, action: PayloadAction<ModalState>) => {
      state.taskGroupModalState = action.payload
    },
    setPage: (state, action: PayloadAction<PageOption>) => {
      state.page = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(listProjects.fulfilled, (state, action) => {
      state.items = action.payload
    }),
      builder.addCase(listTaskGroup.fulfilled, (state, action) => {
        state.taskGroups = action.payload
      })
  },
})

export const {
  setCurrentProject,
  setProjectModalState,
  setTaskGroupModalState,
  setProjectItems,
  setTaskGroups,
  setPage,
} = projectSlice.actions

export default projectSlice.reducer
