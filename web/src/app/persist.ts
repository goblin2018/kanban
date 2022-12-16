import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  storage,
  // whiteList: [],
  blackList: [],
}

const reducer = combineReducers({})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

export default store
