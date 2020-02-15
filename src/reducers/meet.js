import { GET_TOKEN } from '../constants/user'
const USER_STATE = {
  loginname: '',
  toplist: [],
  page: 1,
  limit: 10
}
export default function user(prestate = USER_STATE, action) {
  switch (action.type) {
    case GET_TOKEN:
      return { ...prestate, toplist: action.toplist }
    default:
      return { ...prestate }
  }
}