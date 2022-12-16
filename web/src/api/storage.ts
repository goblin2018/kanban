export const storeToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const getToken = (): string => {
  return localStorage.getItem('token') || ''
}

export const clearToken = () => {
  localStorage.removeItem('token')
}
