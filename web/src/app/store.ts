import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectSlice from 'reducers/projectSlice'
import taskReducer from 'reducers/taskSlice'
import ganttReducer, { GanttState } from 'reducers/ganttSlice'
import userSlice from 'reducers/userSlice'

const persistConfig = {
  key: 'root',
  storage,
  // whiteList: [],
}

let pGanttReducer = persistReducer(
  {
    key: 'gantt',
    storage,
    // whiteList: [],
    transforms: [
      createTransform(
        (state) => {
          return state
        },

        (outboundState, key) => {
          switch (key) {
            case 'hold':
              return -1
            case 'diffX':
              return 0
            case 'dates':
              return outboundState.map((t: string) => new Date(t))
            case 'tasks':
              return outboundState.map((t: any) => ({
                ...t,
                start: new Date(t.start),
                end: new Date(t.end),
              }))
            default:
              return outboundState
          }
        }
      ),
    ],
  },
  ganttReducer
) as unknown as typeof ganttReducer

const reducer = combineReducers({
  project: projectSlice,
  task: taskReducer,
  gantt: pGanttReducer,
  user: userSlice,
})

const persistedReducer = persistReducer<any>(
  persistConfig,
  reducer
) as typeof reducer

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
