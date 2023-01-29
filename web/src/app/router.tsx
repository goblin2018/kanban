import Home from 'pages/Home'
import ProjectDetailPage from 'pages/project'
import ProjectPage from 'pages/projects'
import { createBrowserRouter } from 'react-router-dom'
import Kanban from 'pages/project/kanban'
import GanttPage from 'pages/project/gantt'
import Gantt from 'components/gantt'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  // {
  //   path: '/project/list',
  //   element: <ProjectPage />,
  // },
  {
    path: '/gantt',
    element: <Gantt />,
  },
  // {
  //   path: '/project',
  //   element: <ProjectDetailPage />,
  //   children: [
  //     {
  //       path: 'kanban',
  //       element: <Kanban />,
  //     },
  //     {
  //       path: 'gantt',
  //       element: <GanttPage />,
  //     },
  //   ],
  // },
])

export default router
