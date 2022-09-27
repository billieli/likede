import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
const timeout = 3
const checkTime = () => {
  const timeend = +new Date()
  const totaltime = (timeend - store.getters.timestar) / 1000
  return totaltime > timeout
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout

})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (checkTime) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登陆超时'))
    }
  } else {
    console.log(config)
    return config
  }
}, error => {
  Message.error(error.message)
})

export default service
