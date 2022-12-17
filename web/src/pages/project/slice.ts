import { createSlice } from '@reduxjs/toolkit'
import { Project } from 'api/project'

interface ProjectState {
  items?: Project[]
  addModalState?: 'add' | 'edit' | 'close'
}

// export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
//   const res = await getUser()
//   console.log('get user ', res)

//   return res.data
// })
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
  },
})

export const { openAddModal, closeAddModal } = projectSlice.actions
export default projectSlice.reducer
