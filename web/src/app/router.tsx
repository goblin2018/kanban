import Home from 'pages/Home'
import ProjectDetailPage from 'pages/projectdetail'
import ProjectPage from 'pages/project/index'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/project/list',
    element: <ProjectPage />,
  },
  {
    path: '/project',
    element: <ProjectDetailPage />,
  },
])

export default router
