import axios from 'axios'
import { clearToken, getToken, storeToken } from './storage'

const http = axios.create({
  baseURL: '',
  timeout: 5000,
})

http.interceptors.request.use(
  (config) => {
    let token = getToken()
    if (token) {
      // 携带token传输
      config.headers!['token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
http.interceptors.response.use(
  (res) => {
    // req.headers!['token'] = 'xxxx'
    console.log(res)

    if (res.status == 200) {
      if (res.headers.token && res.headers.token !== '') {
        storeToken(res.headers.token)
      }

      if (res.data.code == 1003) {
        clearToken()
        location.href = '/login'
        return Promise.reject()
      }
    }
    return Promise.resolve(res)
  },
  function (error) {
    if (error.response.status === 401) {
      location.href = '/login'
      return
    }
    return Promise.reject(error)
  }
)

export default http
