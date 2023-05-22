
import axios from 'axios'

const instance = axios.create({
  timeout: 30 * 1000, //超时时间设置
})

instance.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data) //数据转化
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response) {
      if (response.status == '200' && !response.data.result_code) {
        //浏览器状态码
        return Promise.resolve(response.data)
      } else if (response.data.result_code == '200') {
        //接口返回
        return Promise.resolve(response.data.data)
      } else if (response.data.result_code) {
        //接口报错
        return Promise.reject({
          code: response.data.result_code,
          message: response.data.result_message,
        })
      } else {
        return Promise.reject({
          code: response.status,
          message: response.message,
        })
      }
    } else {
      return Promise.reject({ message: '系统繁忙,请稍后再试' })
    }
  },
  (error) => {
    if (error.response) {
      return Promise.reject({
        code: error.response.status,
        message: error.response.data,
      })
    } else {
      return Promise.reject({ message: '系统繁忙,请稍后再试' })
    }
  }
)

export default instance
