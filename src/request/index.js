import Request from './Request'
const isDev = process.env.NODE_ENV === 'development'
const config = {
  appHost: isDev ? 'https://cnodejs.org/api/v1' : '',
  // meeting.flyoil.cn meeting.test.tebiemiao.cn/api https://safety.test.tebiemiao.cn/api
  // tebie: isDev ? 'https://safety.test.tebiemiao.cn/api' : 'https://safety.test.tebiemiao.cn/api'
  tebie: isDev ? 'https://safety.flyoil.cn/api' : 'https://safety.flyoil.cn/api'
}
export const weapp = new Request({ baseURL: config.appHost })

export const tebiemiao = new Request({ baseURL: config.tebie })
