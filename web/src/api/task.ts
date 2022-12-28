import http from './axios'

export interface Task {
  id?: number
  projectId?: number
  taskGroupId?: number
  name?: string
  serial?: number
}

const url = '/api/task'
export const addTask = (t: Task) => {
  return http({
    method: 'POST',
    url: url,
    data: t,
  }).then((res) => res.data)
}
