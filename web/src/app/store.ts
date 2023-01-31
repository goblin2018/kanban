import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectSlice from 'pages/projects/projectSlice'
import taskSlice from 'pages/project/task/taskSlice'
import ganttSlice, { GanttState } from 'components/gantt/ganttSlice'

const persistConfig = {
  key: 'root',
  storage,
  // whiteList: [],
}

let ganttReducer = persistReducer(
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
  ganttSlice
) as unknown as typeof ganttSlice

const reducer = combineReducers({
  project: projectSlice,
  task: taskSlice,
  gantt: ganttReducer,
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
