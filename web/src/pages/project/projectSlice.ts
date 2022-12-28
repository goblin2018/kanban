import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState } from 'api/constatns'
import { lProjects, Project } from 'api/project'

interface ProjectState {
  items?: Project[]
  addModalState?: ModalState
  current?: Project
  taskGroupModalState?: ModalState
}

export const listProjects = createAsyncThunk(
  'project/listProjects',
  async () => {
    const res = await lProjects()
    console.log('get user ', res)

    return res.data
  }
)
const initialState: ProjectState = { items: [] }
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.addModalState = 'add'
    },
    closeAddModal: (state) => {
      state.addModalState = 'close'
    },
    // setProjectItems: (state, action: PayloadAction<Project[]>) => {
    //   state.items = action.payload
    // },
    setCurrentProject: (state, action: PayloadAction<Project>) => {
      state.current = action.payload
    },
    openTaskGroupModal: (state) => {
      state.taskGroupModalState = 'add'
    },
    closeTaskGroupModal: (state) => {
      state.taskGroupModalState = 'close'
    },
  },

  extraReducers: (builder) => {
    builder.addCase(listProjects.fulfilled, (state, action) => {
      state.items = action.payload
    })
  },
})

export const {
  openAddModal,
  closeAddModal,
  setCurrentProject,
  openTaskGroupModal,
  closeTaskGroupModal,
} = projectSlice.actions
export default projectSlice.reducer
