import api from '../api/index'
import { GET_TOKEN, MERGE_INFO, CLEAR_INFO } from '../constants/user'

export function getToken(params) {
  return async dispatch => {
    let result = await api.user.getToken(params)
    dispatch({type: GET_TOKEN, toplist: result.data})
  }
}

export const mergeInfo = (info) => {
  return {
    type: MERGE_INFO,
    obj: info
  }
}

export const clearInfo = () => {
  return {
    type: CLEAR_INFO
  }
}