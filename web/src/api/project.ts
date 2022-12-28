import http from './axios'
import { TaskGroup } from './taskgroup'

export interface Project {
  id?: number
  name?: string
  startAt?: string
  endAt?: string
  desc?: string
  owner?: number
  taskGroups?: TaskGroup[]
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
