import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'

class LogIn extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  state = {
    name: '',
    phone: ''
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  onNameChange(event) {
    this.setState({
      name: event.target.value
    })
  }
  onLogin() {
    const {name, phone} = this.state
    console.log(name, phone)
    Taro.navigateTo({
      url: '/pages/loginfo/index'
    })
  }
  onPhoneChange(event) {
    this.setState({
      phone: event.target.value
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='login'>
        <View className='login_form'>
          <Input className='login-input login-name' type='text' onInput={this.onNameChange.bind(this)} placeholder='姓名' focus />
          <Input className='login-input login-phone' type='text' onInput={this.onPhoneChange.bind(this)} placeholder='手机号' />
        </View>
        <AtButton onClick={this.onLogin.bind(this)} className='login-btn' type='primary'>绑定用户信息</AtButton>
      </View>
    )
  }
}

export default LogIn
