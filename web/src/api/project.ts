import http from './axios'

export interface Project {
  name: string
  startAt?: number
  endAt?: number
  desc?: string
  owner?: number
}

export const addProject = (p: Project) => {
  return http({
    method: 'POST',
    url: '/api/project',
    data: p,
  }).then((res) => res.data)
}
