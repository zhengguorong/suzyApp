import axios from 'axios'
import * as AppConst from './config'

/**
 * 无业务逻辑的网络层，作为第三方网络框架的对接与基础配置
 */

const http = axios.create({
  baseURL: AppConst.APP_BASE_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const crossHttp = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
http.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  if (error.response) {
    // 请求已经发出去，服务器返回错误
    console.log(error.response)
  } else {
    // 请求没有发出去，网络错误等
    console.log('Error', error.message)
  }
  console.log(error.config)
  return Promise.reject(error)
})

module.exports = {
  http,
  crossHttp
}