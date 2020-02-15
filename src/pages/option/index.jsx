import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio, Textarea } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'

class OptionAdd extends Component {
  config = {
    navigationBarTitleText: '意见反馈'
  }
  constructor(props) {
    super(props)
    this.state = {
      info: {
        name: '',
        phone: '',
        department: '',
        description: ''
      }
    }
  }
  async onSubmit() {
    const { info } = this.state
    if (!info.name) {
      Taro.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (!info.phone) {
      Taro.showToast({
        title: '请填写联系方式(手机)',
        icon: 'none'
      })
      return
    }
    if (!info.department) {
      Taro.showToast({
        title: '请填写所属部门',
        icon: 'none'
      })
      return
    }
    let res = await api.user.addFeedback(info)
    // console.log(info)
    console.log(res)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
  }
  onNameChange(event) {
    let { info } = this.state
    info.name = event.target.value
    this.setState({
      info
    })
  }
  onPhoneChange(event) {
    let { info } = this.state
    info.phone = event.target.value
    this.setState({
      info
    })
  }
  onDepChange(event) {
    let { info } = this.state
    info.department = event.target.value
    this.setState({
      info
    })
  }
  onDesChange(event) {
    let { info } = this.state
    info.description = event.target.value
    this.setState({
      info
    })
  }
  render() {
    const { params, roomname, list, symptomsList, info } = this.state
    return (
      <View className='daily'>
        <View className='daily-body'>
          <Text className='daily-label mandatory'>姓名</Text>
          <Input placeholder='请输入' className='input' type='text' onInput={this.onNameChange.bind(this)} />
          <Text className='daily-label mandatory'>联系方式（手机）</Text>
          <Input placeholder='请输入' className='input' type='text' onInput={this.onPhoneChange.bind(this)} />
          <Text className='daily-label mandatory'>所属部门</Text>
          <Input placeholder='请输入' className='input' type='text' onInput={this.onDepChange.bind(this)} />
          <Text className='daily-label'>反馈描述</Text>
          <Textarea placeholder='请输入' autoHeight className='input textAre' type='text' onInput={this.onDesChange.bind(this)} />
          <AtButton onClick={this.onSubmit.bind(this)} className='daily-btn'>提交</AtButton>
        </View>
      </View>
    )
  }
}

export default OptionAdd
