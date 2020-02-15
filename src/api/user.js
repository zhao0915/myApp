import { tebiemiao } from '../request/index'
export default {
  getToken: data => tebiemiao.get(`/auth/getToken`, data),
  // 补充用户信息
  addUserInfo: data => tebiemiao.post(`/userInfo/add`, data),
  // 新增健康状况
  addHealthy: data => tebiemiao.post(`/healthy/add`, data),
  // 新增出行情况
  addTrip: data => tebiemiao.post(`/trip/add`, data),
  // 新增假期上报
  addVacation: data => tebiemiao.post(`/vacation/add`, data),
  // 新增意见反馈
  addFeedback: data => tebiemiao.post(`/feedback/add`, data),
  // 获取公告列表
  getNoticeList: data => tebiemiao.get(`/notice/list`, data),
  // 获取健康列表
  getHealthyList: data => tebiemiao.get(`/healthy/list`, data),
  // 获取返程列表
  getTripList: data => tebiemiao.get(`/trip/list`, data),
  // 获取假期列表
  getVacationList: data => tebiemiao.get(`/vacation/list`, data),
  // 获取补充信息
  getUserInfoList: data => tebiemiao.get(`/userInfo/list`, data),
  // 获取疫情数据接口
  getConditionList: data => tebiemiao.get(`/condition/list`, data),
  // 获取航班信息
  getVirusTrip: data => tebiemiao.get(`/condition/virusTrip`, data),
  // 获取省市疫情
  getCityConditionList: data => tebiemiao.get(`/condition/condition`, data),
  updatePhone: data => tebiemiao.post(`/auth/updatePhone`, data),
  updateMyInfo: data => tebiemiao.post(`/auth/updateMyInfo`, data),
  updateMyStaffNum: data => tebiemiao.post(`/auth/updateStaffNumber?staffNumber=${data.staffNumber}&staffName=${data.staffName}`, data),
  getMettingListByUser: phone => tebiemiao.get(`/metting/getMettingListByUser?phoneEQ=${phone}`),
  updateSubscribeMsg: (data) => tebiemiao.post(`/auth/updateSubscribeMsg`, data),
  findSubScribeMsgList: (data) => tebiemiao.get(`/userSubScribeMsg/findSubScribeMsgList`, data),
  templateMsg: (data) => tebiemiao.get(`/templateMsg/list`, data),
  allMsg: (data) => tebiemiao.post(`/userSubScribeMsg/subScribeAllMsg`, data)
}
