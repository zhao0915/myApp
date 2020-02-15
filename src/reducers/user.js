import { MERGE_INFO, CLEAR_INFO } from '../constants/user'
const USER_STATE = {
  isAlreadyAuth: false, // 受过权， 是否成功未知
  isUserInfoAuth: true, // 授权成功与失败
  isPhoneAuth: false,
  isUserAuth: true,
  name: '',
  avatar: '',
  department: null,
  relaname: null,
  nickname: '',
  userId: '',
  index:0,
  staffNo: null,
  phone: '',
  subscribeMsgList: null
}
export default function user(prestate=USER_STATE, action) {
  switch (action.type) {
    case MERGE_INFO:
      // console.log(action)
      return { ...prestate, ...action.obj}
    case CLEAR_INFO:
      return { ...prestate, name: '', avatar: '', userId: '', phone: '' }
    default:
      return { ...prestate }
  }
}
