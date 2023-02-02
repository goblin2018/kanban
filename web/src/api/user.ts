import http from './axios'

export interface User {
  id?: number
  phone?: string
  password?: string
  avatarColor?: string
  duty?: string
  name?: string
  level?: number
}

export const UserLevel = {
  Normal: 1,
  Admin: 100,
}

const url = '/api/user'
export const login = (u: User) => {
  return http({
    method: 'POST',
    url: url + '/login',
    data: u,
  }).then((res) => res.data)
}

export const updateUser = (u: User) => {
  return http({
    method: 'PUT',
    url: url,
    data: u,
  }).then((res) => res.data)
}

export const updatePassword = (opt: {
  id: number
  action?: string
  op?: string
  np?: string
}) => {
  return http({
    method: 'PUT',
    url: url + '/password',
    data: opt,
  }).then((res) => res.data)
}

export const listUsers = (opt: { offset: number; limit: number }) => {
  return http({
    method: 'GET',
    url: url,
    params: opt,
  }).then((res) => res.data)
}

export const addUser = (u: User) => {
  return http({
    method: 'POST',
    url: url,
    data: u,
  }).then((res) => res.data)
}
