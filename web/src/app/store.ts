import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, createTransform } from 'redux-persist'
import {
  CombinedState,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit'
import projectSlice from 'pages/projects/projectSlice'
import taskSlice from 'pages/project/task/taskSlice'
import ganttSlice from 'components/gantt/ganttSlice'

const persistConfig = {
  key: 'root',
  storage,
  // whiteList: [],
  blackList: [],
  transforms: [
    createTransform(JSON.stringify, (toRehydrate) =>
      JSON.parse(toRehydrate, (key, value) =>
        typeof value === 'string' &&
        value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
          ? new Date(value)
          : value
      )
    ),
  ],
}

const reducer = combineReducers({
  project: projectSlice,
  task: taskSlice,
  gantt: ganttSlice,
})

const persistedReducer = persistReducer<CombinedState<{ project: 

}>>(persistConfig, reducer)

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
