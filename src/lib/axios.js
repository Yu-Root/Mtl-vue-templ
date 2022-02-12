import axios from 'axios'

const ajax = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.PROD === 'production' ? '/' : '/',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})
// ajax.defaults.headers.common["Authorization"] = AUTH_TOKEN

// axios.get('/xxx', { handlerEnabled: false })
const isHandlerEnabled = (config) => {
  return !(config && config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled)
}

ajax.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  },
)

ajax.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (isHandlerEnabled(error.config)) {
    }
    if (error.response) {
      switch (error.response.status) {
        case 401:
          error.message = error.response.data.msg
          alert(error.message)
          window.location.href = 'http://localhost:3000/#/login'
          break
        case 500:
          alert('server is error')
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  },
)

export default ajax
