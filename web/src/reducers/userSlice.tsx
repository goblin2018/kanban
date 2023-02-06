import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'api/user'

interface UserState {
  my?: User
  users: User[]
  editIndex?: number
  page: number
}

const initialState: UserState = { page: 0, editIndex: -1, users: [] }

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
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
    setUserEditIndex: (state, action: PayloadAction<number>) => {
      state.editIndex = action.payload
    },
  },
})

export const { setUser, setPage, setUsers, setUserEditIndex } =
  userSlice.actions
export default userSlice.reducer
