import Home from 'pages/Home'
import Project from 'pages/project/index'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/project',
    element: <Project />,
  },
])

export default router
