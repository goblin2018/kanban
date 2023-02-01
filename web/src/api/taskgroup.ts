import http from './axios'
import { Task } from './task'

export interface TaskGroup {
  id?: number
  projectId?: number
  name?: string
  serial?: number
  tasks?: Task[]
  color?: string
}

const url = '/api/taskgroup'
export const addTaskGroup = (t: TaskGroup) => {
  return http({
    method: 'POST',
    url: url,
    data: t,
  }).then((res) => res.data)
}

export const updateTaskGroup = (t: TaskGroup) => {
  return http({
    method: 'PUT',
    url: url,
    data: t,
  }).then((res) => res.data)
}

export const delTaskGroup = (t: TaskGroup) => {
  return http({
    method: 'DELETE',
    url: url,
    data: { id: t.id },
  }).then((res) => res.data)
}

export const moveTaskGroup = (req: {
  id: number
  projectId: number
  prev?: number
  next?: number
}) => {
  return http({
    method: 'POST',
    url: url + '/move',
    data: req,
  }).then((res) => res.data)
}
