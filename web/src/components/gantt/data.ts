import { GanttTask } from './utils/types'

export let tasks: GanttTask[] = [
  {
    index: 0,
    pIndex: 0,
    id: 1,
    type: 'project',
    name: 'p1',
    start: new Date(2023, 0, 1),
    end: new Date(2023, 0, 2),
    children: [
      {
        index: 1,
        pIndex: 1,
        id: 4,
        type: 'task',
        name: 't4这个任务很长啊',
        start: new Date(2023, 0, 2),
        end: new Date(2023, 0, 3),
      },
      {
        index: 2,
        pIndex: 2,
        id: 3,
        type: 'task',
        name: 't3',
        start: new Date(2023, 0, 1),
        end: new Date(2023, 0, 10),
      },
    ],
  },
  {
    index: 3,
    pIndex: 3,
    id: 2,
    type: 'project',
    name: 'p2',
    start: new Date(2023, 1, 1),
    end: new Date(2023, 1, 10),
  },
]
