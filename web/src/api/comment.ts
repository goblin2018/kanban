import http from './axios'
import { User } from './user'

export interface Comment {
  id?: number
  user?: User
  info?: string
  taskId?: number
  updatedAt?: string
}

let url = '/api/task/comment'
export const addComment = (c: Comment) => {
  return http({
    method: 'POST',
    url: url,
    data: c,
  }).then((res) => res.data)
}

export const updateComment = (c: Comment) => {
  return http({
    method: 'PUT',
    url: url,
    data: c,
  }).then((res) => res.data)
}

export const deleteComment = (c: Comment) => {
  return http({
    method: 'DELETE',
    url: url,
    data: c,
  }).then((res) => res.data)
}

export const listAllComments = (c: Comment) => {
  return http({
    method: 'GET',
    url: url,
    params: { taskId: c.taskId },
  }).then((res) => res.data)
}
