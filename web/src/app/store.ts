import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectReducer from 'reducers/projectSlice'
import taskReducer from 'reducers/taskSlice'
import ganttReducer from 'reducers/ganttSlice'
import userSlice from 'reducers/userSlice'
import dayjs from 'dayjs'

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
        (state, key) => {
          switch (key) {
            default:
              return state
          }
        },

        (outboundState, key) => {
          switch (key) {
            case 'hold':
              return -1
            case 'diffX':
              return 0
            case 'dates':
              return outboundState.map((t: string) => dayjs(t))
            case 'tasks':
              return outboundState.map((t: any) => ({
                ...t,
                start: t.start == undefined ? undefined : dayjs(t.start),
                end: t.end == undefined ? undefined : dayjs(t.end),
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

let pProjectReducer = persistReducer(
  {
    key: 'project',
    storage,
    transforms: [
      createTransform((state, key) => {
        switch (key) {
          case 'projectModalState':
          case 'taskGroupModalState':
            return 'close'
          default:
            return state
        }
      }),
    ],
  },
  projectReducer
) as unknown as typeof projectReducer

let pTaskReducer = persistReducer(
  {
    key: 'task',
    storage,
    transforms: [
      createTransform((state, key) => {
        switch (key) {
          case 'taskDrawerOpen':
            return false
          default:
            return state
        }
      }),
    ],
  },
  taskReducer
) as unknown as typeof taskReducer

const reducer = combineReducers({
  project: pProjectReducer,
  task: pTaskReducer,
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
