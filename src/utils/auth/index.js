import Taro from '@tarojs/taro'
import openWechatAuth from './wechat'
import { mergeInfo } from '../../actions/user'
import store from '../../store'

export default function openAuth(disabledAuth) {
  return new Promise(async (resolve, reject) => {
    try {
      await openWechatAuth(disabledAuth)
      resolve()
    } catch (err) {
      console.log('授权流程失败', err)
      reject(err)
    } finally {
      // store.dispatch(mergeInfo({
      //   isAlreadyAuth: true
      // }))
    }
  })
}
