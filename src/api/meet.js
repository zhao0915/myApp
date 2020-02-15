import { tebiemiao } from '../request/index'
export default {
  // getTopics: (data) => weapp.get('/topics', data),
  getUserHotelList: (mettingIdEQ,phoneEQ) => tebiemiao.get(`/metting/getUserHotelList?mettingIdEQ=${mettingIdEQ}&phoneEQ=${phoneEQ}`),
  getUserMettingList: (mettingIdEQ, userNameLK, phoneEQ) => tebiemiao.get(`/metting/getUserMettingList?mettingIdEQ=${mettingIdEQ}&userNameLK=${userNameLK}&phoneEQ=${phoneEQ}`),
  getmettingAgendaList: (mettingIdEQ) => tebiemiao.get(`/mettingAgenda/list?mettingIdEQ=${mettingIdEQ}`),
  getmettingSign: (mettingId,phone) => tebiemiao.post(`/metting/sign?mettingId=${mettingId}&phone=${phone}`),
  getmettingServer: (mettingIdEQ) => tebiemiao.get(`/meetingService/list?mettingIdEQ=${mettingIdEQ}`)
}
