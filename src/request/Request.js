import Taro from '@tarojs/taro'
import Tip from '../utils/tip'
import { mergeInfo } from '../actions/user'
import store from '../store/index'
// import Taro from '@tarojs/taro'
// import getWechatToken from '@/utils/auth/check'

export default class Request {
  constructor(config) {
    this.config = config
  }
  async req(url, data, method) {
    let token = this.token
    token = Taro.getStorageSync('token')
    // Taro.getStorageSync('token')
    // console.log('waimiande' + token)
    if (!token) {
      this.token = token = Taro.getStorageSync('token') || ''
      // console.log('qingqiu1daide' + Taro.getStorageSync('token'))
    }

    try {
      // 开始请求接口
      // console.log('request 开始请求接口')
      const res = await Taro.request({
        url: this.config.baseURL + url,
        data,
        header: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
        method
      })

      if (res.statusCode === 200 || res.statusCode === 0 || res.statusCode === '200') {
        if (!this.config.noConsole) {
          console.log(`${new Date().toLocaleString()}【 M=${url} 】【接口响应：】`, res.data)
        }
        return res.data
      } else if (res.statusCode === 401 || res.statusCode === 403) {
        // return false
        // console.log(401403)
        store.dispatch(mergeInfo({
          phone: null,
          staffNo: null,
          token: null,
          isPhoneAuth: false
        }))
        Taro.clearStorage()
        Taro.reLaunch({
          url: '/pages/home/index'
        })
      } else if (res.statusCode === 500) {
        console.log(res.data)
        if (res.data.code === '405') {
          console.log('121212121')
          Tip.showToast(res.data.message)
          throw res.data.message
        } else {
          Tip.showToast('服务器繁忙，请稍后再试')
          throw '服务器繁忙，请稍后再试'
        }
        
      } else {
        const msg = res.data.message
        throw msg ? `${msg}~` : res.data.code
      }
    } catch (e) {
      console.log('错误', e)
      const msg = typeof e === 'string' ? e : (e.data.message || e.errorMessage)
      console.log('msg', msg)
      Tip.showToast(msg)
      throw e
    }
  }
  get(url, data) {
    return this.req(url, data, 'GET')
  }
  post(url, data) {
    return this.req(url, data, 'POST')
  }
  del(url, data) {
    return this.req(url, data, 'DELETE')
  }
  put(url, data) {
    return this.req(url, data, 'PUT')
  }
}
