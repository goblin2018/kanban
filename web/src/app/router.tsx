import Home from 'pages/Home'
import ProjectPage from 'pages/project/index'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/project',
    element: <ProjectPage />,
  },
])

export default router
