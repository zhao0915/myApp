import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem } from '@tarojs/components'
import Info from './components/info/index'
import Panel from './components/panel/index'
import Statice from './components/statice/index'
import { connect } from '@tarojs/redux'
import api from '../../api/index'
import getWechatToken from '../../utils/auth/check'
import './index.less'
import { AtNoticebar } from 'taro-ui'
@connect(function (state) {
  return { userInfo: state.user }
})
class Home extends Component {
  config = {
    navigationBarTitleText: '易企安心',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#61C9DB'
  }
  constructor(props) {
    super(props)
    this.state = {
      allInfo: {},
      noticeList: [],
      panelList: [
        { 
          id: '1',
          title: '员工健康上报',
          list: [
            { id: '2', name: '健康日报', icon: require('./image/day.png')},
            { id: '3', name: '返程上报', icon: require('./image/return.png') },
            { id: '4', name: '假期上报', icon: require('./image/holiday.png') }
          ]
        },
        {
          id: '5',
          title: '疫情信息查询',
          list: [
            { id: '6', name: '高危车次查询', icon: require('./image/car.png') },
            { id: '7', name: '疫情统计', icon: require('./image/static.png') }
          ]
        }
      ]
    }
  }
  async componentWillMount() {
    let { allInfo, noticeList } = this.state
    let tokenResult = await getWechatToken()
    // 公告列表
    let res = await api.user.getNoticeList()
    if (res.code === '200') {
      noticeList = res.data
      if (noticeList.length > 3) {
        noticeList.length = 3
      }
    }
    // 全国疫情
    let resCondition = await api.user.getCityConditionList()
    if (resCondition.code === '200') {
      let data = JSON.parse(resCondition.data)
      allInfo = data.data.chinaTotal
      console.log(allInfo)
    }
    this.setState({
      allInfo,
      noticeList
    })
    // if (this.props.userInfo.phone) {
    //   await this.onGetList(this.props.userInfo.phone, this.props.userInfo.index)
    // }
  }
  onGetNotice() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: '/pages/notice/index'
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  render() {
    const { panelList, allInfo, noticeList } = this.state
    let { userInfo } = this.props
    console.log(userInfo)
    return (
      <View className='home'>
        <Info userInfo={userInfo}></Info>
        <Statice allInfo={allInfo}></Statice>
        <View className='notice-bg'>
          <View className='notic-box' onClick={this.onGetNotice.bind(this)}>
            <Image className='notic-image' src={require('./image/notice.png')}></Image>
            <View className='notic-right'>
              <View className='notice-new'>最新</View>
              <View className='notice-content'>
                <Swiper
                  className='test-h'
                  vertical
                  circular
                  autoplay>
                  {noticeList.map((item, index) => {
                    return (
                      <SwiperItem>
                        {/* <View className='demo-text'>{'撒大大的大撒上的撒大大的大撒上的撒大大的大撒上的撒大大的大撒上的撒大大的大撒上的撒大大的大撒上的撒大大的大撒上的'}</View> */}
                        <View className='demo-text'>{item.subject}</View>
                      </SwiperItem>
                    )
                  })}
                </Swiper>
              </View>
            </View>
          </View>
        </View>
        
        <Panel userInfo={userInfo} panelList={panelList}></Panel>

      </View>
    )
  }
}

export default Home
