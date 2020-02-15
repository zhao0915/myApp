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
    let resHealthy = await api.user.getHealthyList({idEQ})
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
          <Text className='daily-label'>填报日期</Text>
          <View className='daili-value'>{moment(info.reportTime).format('YYYY/MM/DD').replace(/\//g, '-')}</View>
          <Text className='daily-label'>当前所在位置</Text>
          <View className='daili-value'>{info.address}</View>
          <Text className='daily-label'>自测体温</Text>
          <View className='daili-value'>{info.selfTemperature}</View>
          <Text className='daily-label'>当日体温</Text>
          <View className='daili-value'>{info.dayTemperature}</View>
          <Text className='daily-label'>本人是否有以下症状</Text>
          <View className='daili-value'>{info.symptom}</View>
        </View>

      </View>
    )
  }
}

export default Daily
