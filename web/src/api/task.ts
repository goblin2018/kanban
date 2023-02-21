import http from './axios'

export interface Task {
  id?: number
  projectId?: number
  taskGroupId?: number
  name?: string
  serial?: number
  status?: number
  startAt?: string
  endAt?: string
  desc?: string
}

const url = '/api/task'
export const addTask = (t: Task) => {
  return http({
    method: 'POST',
    url: url,
    data: t,
  }).then((res) => res.data)
}

export const updateTaskStatus = (t: Task) => {
  return http({
    method: 'PUT',
    url: url + '/status',
    data: t,
  }).then((res) => res.data)
}

export const moveTask = (opt: {
  id: number
  prev: number
  next: number
  taskGroupId: number
}) => {
  return http({
    method: 'POST',
    url: url + '/move',
    data: opt,
  }).then((res) => res.data)
}

export const updateTask = (t: Task) => {
  return http({
    method: 'PUT',
    url: url,
    data: t,
  }).then((res) => res.data)
}

export const delTask = (t: Task) => {
  return http({
    method: 'DELETE',
    url: url,
    data: t,
  }).then((res) => res.data)
}
