import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'api/user'

interface UserState {
  my?: User
  users?: User[]
  page?: number
}

const initialState: UserState = { page: 0 }

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.my = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
  },
})

export const { setUser, setPage } = userSlice.actions
export default userSlice.reducer
