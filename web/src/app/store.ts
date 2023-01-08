import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectSlice from 'pages/projects/projectSlice'
import taskSlice from 'pages/project/task/taskSlice'

const persistConfig = {
  key: 'root',
  storage,
  // whiteList: [],
  blackList: [],
}

const reducer = combineReducers({
  project: projectSlice,
  task: taskSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

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
