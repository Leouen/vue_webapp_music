import axios from 'axios'

export function request (config) {
  // 创建一个 axios 对象
  const instance = axios.create({
    // 根路径
    baseURL: 'http://192.168.43.149:3000',
    // 请求时间
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}
