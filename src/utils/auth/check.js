import { getToken } from './utils'
import Taro from '@tarojs/taro'

import api from '../../api/index'

import { mergeInfo } from '../../actions/user'
import store from '../../store'

export default function getWechatToken() {
  return new Promise(async(resolve, reject)=>{
    try {
      const res = await Taro.login()
      const code = res.code
      console.log(code)
      await getTokenList(code)
      resolve()
    } catch (err) {
      console.log('授权流程失败', err)
      store.dispatch(mergeInfo({
        isUserAuth: false
      }))
      reject(err)
    }
  })

}

async function getTokenList(code) {
  try {
    const res = await api.user.getToken({
      code
    })
    if (res.data && res.data !== null) {
      const { phone, tokenId, staffNo, relaname, id, subscribeMsgList, department } = res.data
      store.dispatch(mergeInfo({
        phone,
        relaname,
        userId: id,
        department,
        staffNo,
        token: tokenId,
        subscribeMsgList,
        isPhoneAuth: !!phone
      }))
      Taro.setStorageSync('token', tokenId)
    }
  } catch (error) {
    console.log('token失败')
     store.dispatch(mergeInfo({
      isPhoneAuth: false
    }))
  }
  return
}
