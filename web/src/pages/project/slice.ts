import { createSlice } from '@reduxjs/toolkit'

interface ProjectState {
  items: []
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
  reducers: {},
})

export const {} = projectSlice.actions
export default projectSlice.reducer
