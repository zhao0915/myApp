import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import api from '../../api/index'
import './index.less'

class LogIn extends Component {
  config = {
    navigationBarTitleText: '补充信息'
  }

  state = {
    info: {
      name: '',
      idCard: '',
      department: '',
      address: '',
      workAddress: '',
      emergencyName: '',
      emergencyPhone: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  onNameChange(event) {
    let { info } = this.state
    info.name = event.target.value
    this.setState({
     info
    })
  }
 
  onIdChange(event) {
    let { info } = this.state
    info.idCard = event.target.value
    this.setState({
      info
    })
  }

  onAddressChange(event) {
    let { info } = this.state
    info.address = event.target.value
    this.setState({
      info
    })
  }

  onWorkChange(event) {
    let { info } = this.state
    info.workAddress = event.target.value
    this.setState({
      info
    })
  }
  onDepartmentChange(event) {
    let { info } = this.state
    info.department = event.target.value
    this.setState({
      info
    })
  }
  onEnameChange(event) {
    let { info } = this.state
    info.emergencyName = event.target.value
    this.setState({
      info
    })
  }
  onEphoneChange(event) {
    let { info } = this.state
    info.emergencyPhone = event.target.value
    this.setState({
      info
    })
  }
  async onLogin() {
    const { info } = this.state
    // console.log(info)
    if (!info.name) {
      Taro.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
      return
    }
    if (!info.emergencyPhone) {
      Taro.showToast({
        title: '请填写紧急联系人手机号',
        icon: 'none'
      })
      return
    }
    if (!this.isPhone(info.emergencyPhone)) {
      Taro.showToast({ title: '请填写正确的紧急联系人手机号', icon: 'none' })
      return false
    }
    let res = await api.user.addUserInfo(info)
    // console.log(res)
    if (res.code === '200') {
      Taro.reLaunch({
        url: '/pages/home/index'
      })
    }
  }

  isPhone(phone) {
    const reg = /^(\+86)|(86)?1[3,5,8,7]{1}[0-9]{1}[0-9]{8}$/
    return reg.test(phone)
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='login'>
        <View className='login_form'>
          <Input className='login-input login-name' type='text' onInput={this.onNameChange.bind(this)} placeholder='姓名' focus />
          <Input className='login-input login-job' type='text' onInput={this.onDepartmentChange.bind(this)} placeholder='部门' />
          <Input className='login-input login-id' type='text' onInput={this.onIdChange.bind(this)} placeholder='身份证号码' />
          <Input className='login-input login-address' type='text' onInput={this.onAddressChange.bind(this)} placeholder='户籍所在地' />
          <Input className='login-input login-work' type='text' onInput={this.onWorkChange.bind(this)} placeholder='工作常驻地址' />
          <Input className='login-input login-elseaddress' type='text' onInput={this.onEnameChange.bind(this)} placeholder='应急联系人姓名' />
          <Input className='login-input login-elsephone' type='text' onInput={this.onEphoneChange.bind(this)} placeholder='应急联系人电话' />
          <AtButton onClick={this.onLogin.bind(this)} className='login-btn'>确认</AtButton>
        </View>
        
      </View>
    )
  }
}

export default LogIn
