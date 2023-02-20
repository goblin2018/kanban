import Home from 'pages/Home'
import ProjectDetailPage from 'pages/project'
import ProjectPage from 'pages/projects'
import { createBrowserRouter } from 'react-router-dom'
import Kanban from 'pages/project/kanban'
import GanttPage from 'pages/project/gantt'
import Gantt from 'components/gantt'
import Login from 'pages/login'
import UserInfo from 'pages/user/User'
import Users from 'pages/user/Users'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProjectPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/user',
    element: <UserInfo />,
  },
  {
    path: '/users',
    element: <Users />,
  },

  {
    path: '/gantt',
    element: <Gantt />,
  },
  {
    path: '/project',
    element: <ProjectDetailPage />,
    children: [
      {
        path: '',
        element: <Kanban />,
      },
      {
        path: 'gantt',
        element: <GanttPage />,
      },
    ],
  },
])

export default router
