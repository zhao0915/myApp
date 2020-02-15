import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'
import { connect } from '@tarojs/redux'

@connect(function (state) {
  return { userInfo: state.user }
})
class Daily extends Component {
  config = {
    navigationBarTitleText: '我的信息'
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
    const { userId } = this.props.userInfo
    let { info } = this.state
    // console.log(idEQ)
    let resHealthy = await api.user.getUserInfoList({ userIdEQ: userId })
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
          <Text className='daily-label'>姓名</Text>
          <View className='daili-value'>{info.name}</View>
          <Text className='daily-label'>部门</Text>
          <View className='daili-value'>{info.department}</View>
          <Text className='daily-label'>身份证号码</Text>
          <View className='daili-value'>{info.idCard}</View>
          <Text className='daily-label'>户籍所在地</Text>
          <View className='daili-value'>{info.address}</View>
          <Text className='daily-label'>工作常驻地址</Text>
          <View className='daili-value'>{info.workAddress}</View>
          <Text className='daily-label'>应急联系人姓名</Text>
          <View className='daili-value'>{info.emergencyName}</View>
          <Text className='daily-label'>应急联系人电话</Text>
          <View className='daili-value'>{info.emergencyPhone}</View>
        </View>

      </View>
    )
  }
}

export default Daily
