import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import './index.css'
import 'antd/dist/reset.css'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

import router from './router'
import store, { persistor } from './store'
import { ConfigProvider } from 'antd'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ConfigProvider>
)
