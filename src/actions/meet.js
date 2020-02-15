import api from '../api/index'
import { MEET_LIST } from '../constants/meet'
// import Taro from '@/tarojs/taro'
export function getToken(params) {
  return async dispatch => {
    let result = await api.user.getToken(params)
    dispatch({ type: MEET_LIST, toplist: result.data })
  }
}
