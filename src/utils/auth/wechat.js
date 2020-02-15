import Taro from '@tarojs/taro'
import { getToken } from './utils'
import { mergeInfo } from '../../actions/user'
// import store from '../../store'

/*
  流程：
  login: getSetting: 判断是否授权过 => getUserInfo: 唤起授权，并获取用户信息 => 登录获取code并得到token
 */
export default function openWechatAuth(disabledAuth = false) {
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo = await userWechatAuth()
      console.log(userInfo, 'userInfouserInfouserInfo')
      if (userInfo.isUserInfoAuth || (disabledAuth && !userInfo.isUserInfoAuth)) {
        // await getWechatToken(userInfo)
        resolve()
      } else {
        // store.dispatch(mergeInfo(userInfo))
        reject()
      }
    } catch (err) {
      reject(err)
    }
  })
}

// 判断微信用户是否授权
function userWechatAuth() {
  return new Promise(async (rs, rj) => {
    Taro.getSetting({
      success: async res => {
        let info
        if (res.authSetting['scope.userInfo']) {
          info = await getWechatUserInfo()
          console.log('授权过')
        } else {
          info = {
            isUserAuth: false,
            isUserInfoAuth: false
          }
          console.log('未授权')
        }
        rs(info)
      },
      fail: err => {
        rj(err)
      }
    })
  })
}
// 微信授权
async function getWechatUserInfo() {
  let info
  try {
    const res = await Taro.getUserInfo()
    console.log('getWechatUserInfo', res)
    info = {
      ...res.userInfo,
      avatar: res.userInfo.avatarUrl,
      isUserInfoAuth: true
    }
  } catch (err) {
    info = {
      isUserAuth: false
    }
    console.log('取消授权')
  }
  return info
}

// 获取微信code并获取token
async function getWechatToken(userInfo) {
  const res = await Taro.login()
  const code = res.code
  await getToken(code, userInfo)
}
