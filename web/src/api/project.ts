import http from './axios'
import { TaskGroup } from './taskgroup'
import { User } from './user'

export interface Project {
  id?: number
  name?: string
  startAt?: string
  endAt?: string
  desc?: string
  ownerId?: number
  owner?: User
  taskGroups?: TaskGroup[]
  status?: number
}
const url = '/api/project'
export const addProject = (p: Project) => {
  return http({
    method: 'POST',
    url: url,
    data: p,
  }).then((res) => res.data)
}

export const lProjects = () => {
  return http({
    method: 'GET',
    url: url,
    params: {},
  }).then((res) => res.data)
}

export const getProjectDetail = (id: number) => {
  return http({
    method: 'GET',
    url: url + '/detail',
    params: { id: id },
  }).then((res) => res.data)
}

export const updateProject = (p: Project) => {
  return http({
    method: 'PUT',
    url: url,
    data: p,
  }).then((res) => res.data)
}
