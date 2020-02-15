import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import moment from 'moment'
import './index.less'
import api from '../../api/index'
import { connect } from '@tarojs/redux'

@connect(function (state) {
  return { userInfo: state.user }
})

class Mine extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#61C9DB'
  }
  state = {
    healthyList: [],
    vacationList: [],
    tripList: []
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  async componentWillMount() {
    let { userInfo } = this.props
    let { healthyList, vacationList, tripList } = this.state
    let resHealthy = await api.user.getHealthyList({ userIdEQ: userInfo.userId})
    let resTrip = await api.user.getTripList({ userIdEQ: userInfo.userId })
    let resVacation = await api.user.getVacationList({ userIdEQ: userInfo.userId })
    if (resHealthy.code === '200' && resHealthy.data) {
      healthyList = resHealthy.data.list
      console.log(healthyList)
    }
    if (resTrip.code === '200' && resTrip.data) {
      tripList = resTrip.data.list
      console.log(tripList)
    }
    if (resVacation.code === '200' && resVacation.data) {
      vacationList = resVacation.data.list
      console.log(vacationList)
    }
    this.setState({
      healthyList,
      tripList,
      vacationList
    })
  }
  onMineInfo() {
    Taro.navigateTo({
      url: `/pages/mineInfo/index`
    })
  }
  onHealthyDetail(item) {
    Taro.navigateTo({
      url: `/pages/dailyDetail/index?idEQ=${item.id}`
    })
  }
  onHolidayDetail(item) {
    Taro.navigateTo({
      url: `/pages/holidayDetail/index?idEQ=${item.id}`
    })
  }
  onReturnDetail(item) {
    Taro.navigateTo({
      url: `/pages/returnDetail/index?idEQ=${item.id}`
    })
  }
  onOption() {
    Taro.navigateTo({
      url: '/pages/option/index'
    })
  }
  render() {
    let { healthyList, vacationList, tripList } = this.state
    const { userInfo } = this.props
    return (
      <View className='mine'>
        <View className='mine-info' onClick={this.onMineInfo.bind(this)}>
          <View className='mine-info-avator'>
            <open-data type="userAvatarUrl" className='openData'></open-data>
          </View>
          <View className='mine-info-basic'>
            <View className='mine-info-name'>
              {userInfo.relaname === null ? (
                <open-data type="userNickName" style='color:#fff'></open-data>
              ) : (userInfo.relaname)}
            </View>
            <View className='mine-info-phone'>手机号：{userInfo.phone || '暂无'}</View>
          </View>
          <Image className='mine-info-row' src={require('./image/white.png')}></Image>
        </View>
        <View className='mine-btn'>
          <View className='mine-btn-item'>
            我发起的
          </View>
          <View onClick={this.onOption.bind(this)} className='mine-btn-item'>
            意见反馈
          </View>
        </View>
        <View className='mine-content'>
          {healthyList.map((item, index) => {
            return (
              <View className='mine-content-item' onClick={this.onHealthyDetail.bind(this, item)}>
                <View className='mine-content-left'>
                  <View className='mine-content-title'>健康日报</View>
                  <View className='mine-content-time'>{moment(item.reportTime).format('YYYY/MM/DD').replace(/\//g, '-')}</View>
                </View>
                <Image className='content-row' src={require('./image/hui.png')}></Image>
              </View>
            )
          })}
          {tripList.map((item, index) => {
            return (
              <View className='mine-content-item' onClick={this.onReturnDetail.bind(this, item)}>
                <View className='mine-content-left'>
                  <View className='mine-content-title'>返程上报</View>
                  <View className='mine-content-time'>{moment(item.reportTime).format('YYYY/MM/DD').replace(/\//g, '-')}</View>
                </View>
                <Image className='content-row' src={require('./image/hui.png')}></Image>
              </View>
            )
          })}
          {vacationList.map((item, index) => {
            return (
              <View className='mine-content-item' onClick={this.onHolidayDetail.bind(this, item)}>
                <View className='mine-content-left'>
                  <View className='mine-content-title'>假期上报</View>
                  <View className='mine-content-time'>{moment(item.reportTime).format('YYYY/MM/DD').replace(/\//g, '-')}</View>
                </View>
                <Image className='content-row' src={require('./image/hui.png')}></Image>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Mine
