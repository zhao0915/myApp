import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'
import store from './store'
// import configStore from './store'
import './app.less'
import 'taro-ui/dist/style/index.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

// const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/home/index',
      'pages/mine/index',
      'pages/travel/index',
      'pages/epidemic/index',
      'pages/travel/pages/query/index',
      'pages/travel/pages/result/index',
      'pages/dailyDetail/index',
      'pages/notice/index',
      'pages/noticedetail/index',
      'pages/mineInfo/index',
      'pages/option/index',
      'pages/holiday/index',
      'pages/holidayDetail/index',
      'pages/return/index',
      'pages/returnDetail/index',
      'pages/guide/index',
      'pages/loginfo/index',
      'pages/login/index',
      'pages/daily/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      custom: false,
      color: '#999999',
      selectedColor: '#61C9DB',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'pages/home/index',
          text: '疫情上报管理',
          // iconPath: './asset/images/current.png',
          // selectedIconPath: './asset/images/current-hover.png'
        },
        {
          pagePath: 'pages/mine/index',
          text: '我的',
          // iconPath: './asset/images/all.png',
          // selectedIconPath: './asset/images/all-hover.png'
        }
      ]
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    }
  }
  componentDidMount() {
    const updateManager = Taro.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log('版本信息')
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      // console.log('正在更新')
      updateManager.applyUpdate()
      // Taro.showModal({
      //   title: '更新提示',
      //   content: '新版本已经准备好，是否马上重启小程序？',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('点击确定')
      //       updateManager.applyUpdate()
      //     } else {
      //       Taro.showModal({
      //         title: '已经有新版本了哟~',
      //         content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
      //       })
      //     }
      //   }
      // })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      Taro.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
      })
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
