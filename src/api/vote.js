import { tebiemiao } from '../request/index'
export default {
  // 创建投票
  createVote: params => tebiemiao.post(`/vote/createVote`, params),
  // 用户投票
  userVote: params => tebiemiao.post(`/vote/userVote`, params),
  // 获取我创建的投票
  getMyCreateVote: (pageNumber, pageSize) => tebiemiao.get(`/vote/myCreateVotes?pageNumber=${pageNumber}&pageSize=${pageSize}`),
  // 获取我参与的投票
  getMyVotes: (pageNumber, pageSize) => tebiemiao.get(`/vote/myVotes?pageNumber=${pageNumber}&pageSize=${pageSize}`),
  // 获取投票详情
  getVoteInfo: (id) => tebiemiao.get(`/vote/getVoteInfo?id=${id}`),
  // 获取投票人员
  getVotePerson: (pageNumber, pageSize, voteIdEQ) => tebiemiao.get(`/vote/getVotePerson?pageNumber=${pageNumber}&pageSize=${pageSize}&voteIdEQ=${voteIdEQ}`),
  // 获取未投票人员
  getUnVotePerson: (pageNumber, pageSize, voteIdEQ) => tebiemiao.get(`/vote/getUnVotePerson?pageNumber=${pageNumber}&pageSize=${pageSize}&voteIdEQ=${voteIdEQ}`),
  // 按选项查人数
  getVoteOptionRecord: (id) => tebiemiao.get(`/vote/getVoteOptionRecord?voteId=${id}`),
  // 获取oss上传凭证
  getOssToken: () => tebiemiao.get(`/oss/signature`),
  // 投票选项排序
  getVoteOption: (id, orderFlag) => tebiemiao.get(`/vote/getVoteOption?id=${id}&orderFlag=${orderFlag}`),
  // 一键提醒
  notifyUnVotePerson: (idEQ) => tebiemiao.get(`/vote/notifyUnVotePerson?voteIdEQ=${idEQ}`),
  // 删除我创建的投票
  deleteVote: (id) => tebiemiao.del(`/vote/delete/${id}`)
}