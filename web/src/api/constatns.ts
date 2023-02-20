export type ModalState = 'add' | 'edit' | 'close'

export const ErrCode = {
  Ok: 200,
  InvalidParams: 400,
  Forbidden: 403,
  TokenError: 1003,
  UserAlreadyExists: 2003,
  UserNotExists: 2004,
  InvalidPassword: 2005,
}

export const Action = {
  Reset: 'reset',
  Update: 'update',
}

export const ProjectStatus = {
  NotStart: 1,
  On: 2,
  Done: 3,
}

export const ProjectStatusInfo = {
  [ProjectStatus.NotStart]: { info: '未开始', color: '#aabbcc' },
  [ProjectStatus.On]: {
    info: '进行中',
    color: '#1E90FF',
  },
  [ProjectStatus.Done]: {
    info: '已完成',
    color: '#00FF7F',
  },
}

export type Theme = 'light' | 'dark'
