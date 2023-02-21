import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from 'api/constatns'
import { lProjects, Project } from 'api/project'
import { lTaskGroup, TaskGroup } from 'api/taskgroup'

interface ProjectState {
  totalProjects: Project[]
  currentProject: Project
  currentTaskGroup: TaskGroup
  projectModalState: ModalState
  taskGroupModalState: ModalState
  taskGroups: TaskGroup[]
  page: PageOption
  projectOption: ProjectOption
}

export type PageOption = '' | 'gantt'
export type ProjectOption = 'my' | 'all'

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
    const p = (getState() as { project: ProjectState }).project.currentProject
    const res = await lTaskGroup({ projectId: p.id })

    return res.data.items || []
  }
)

const initialState: ProjectState = {
  totalProjects: [],
  currentProject: {},
  taskGroups: [],
  page: '',
  projectModalState: 'close',
  taskGroupModalState: 'close',
  projectOption: 'my',
  currentTaskGroup: {},
}
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setTotalProjects: (state, action: PayloadAction<Project[]>) => {
      state.totalProjects = action.payload
    },

    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.currentProject = action.payload
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
    setProjectOption: (state, action: PayloadAction<ProjectOption>) => {
      state.projectOption = action.payload
    },
    setCurrentTaskGroup: (state, action: PayloadAction<TaskGroup>) => {
      state.currentTaskGroup = action.payload
      state.taskGroupModalState = 'edit'
    },
  },

  extraReducers: (builder) => {
    builder.addCase(listProjects.fulfilled, (state, action) => {
      state.totalProjects = action.payload
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
  setTotalProjects,
  setTaskGroups,
  setPage,
  setProjectOption,
  setCurrentTaskGroup,
} = projectSlice.actions

export default projectSlice.reducer
