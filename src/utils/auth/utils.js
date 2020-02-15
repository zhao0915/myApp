import api from '../../api/index'
import Taro from '@tarojs/taro'
import { mergeInfo } from '../../actions/user'
import store from '../../store'
// 通过code获取token
export async function getToken(code, userInfo) {
  // type = 1微信小程序, type = 2微信公众号, type = 3支付宝, type = 4支付宝小程序
  const { nickName, avatarUrl, avatar } = userInfo
  const type = 1
  // console.log(userInfo)
  const res = await api.user.getToken({
    code,
    type,
    avatar: avatarUrl || avatar,
    nikename: nickName
  })
  const { phone, tokenId } = res.data
  store.dispatch(mergeInfo({
    ...userInfo,
    phone,
    token: tokenId,
    isPhoneAuth: !!phone
  }))
  Taro.setStorageSync('token', tokenId)
  return
}
