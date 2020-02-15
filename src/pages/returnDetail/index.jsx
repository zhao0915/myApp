import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'

class Daily extends Component {
  config = {
    navigationBarTitleText: '健康日报'
  }
  constructor(props) {
    super(props)
    this.state = {
      info: {
        // 地址
        address: '',
        symptomList: [],
        elseInput: '',
        // 自测体温
        selfTemperature: '',
        // 当日体温
        dayTemperature: '',
        // 症状
        symptom: '',
        // 上报时间
        reportTime: ''
      }
    }
  }
 
  async componentWillMount() {
    // console.log(this.$router.params)
    const { idEQ } = this.$router.params
    let { info } = this.state
    // console.log(idEQ)
    let resHealthy = await api.user.getTripList({idEQ})
    if (resHealthy.code === '200') {
      info = resHealthy.data.list[0]
    }
    this.setState({
      info
    })
  }
  render() {
    const { info } = this.state
    return (
      <View className='daily'>
        <View className='daily-body'>
          <Text className='daily-label'>返程日期</Text>
          <View className='daili-value'>{moment(info.returnTime).format('YYYY/MM/DD').replace(/\//g, '-')}</View>
          <Text className='daily-label'>交通工具出行方式</Text>
          <View className='daili-value'>{info.vehicle}</View>
          <Text className='daily-label'>火车车次车厢/航班班次</Text>
          <View className='daili-value'>{info.trainNumber}</View>
          <Text className='daily-label'>车厢/座位号</Text>
          <View className='daili-value'>{info.seatNumber}</View>
          <Text className='daily-label'>行程记录</Text>
          <View className='daili-value'>{info.trip}</View>
        </View>

      </View>
    )
  }
}

export default Daily
