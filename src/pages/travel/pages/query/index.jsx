import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import api from '../../api/index'
import './index.less'

class TravelQuery extends Component {
  config = {
    navigationBarTitleText: '查询'
  }

  state = {
    queryType: 'train',
    placeholderValue: '请输入车次，如G127',
    params: {
      time: '',
      value: ''
    }
  }

  componentDidMount() {
    console.log(this.$router.params)
    let { placeholderValue } = this.state
    const { type } = this.$router.params
    if (type === 'train') {
      placeholderValue = '请输入车次，如G127'
    } else if (type === 'plane') {
      placeholderValue = '请输入航班号，如CA1831'
    } else {
      placeholderValue = '请输入城市名，如武汉'
    }
    this.setState({
      queryType: type,
      placeholderValue
    })
  }
  onDateChange(event) {
    let { params } = this.state
    params.time = event.detail.value
    this.setState({
      params
    })
  }
  onCarChange(event) {
    let { params } = this.state
    params.value = event.target.value
    this.setState({
      params
    })
  }
  onLogin() {
    let { params, queryType } = this.state
    // console.log(params)
    Taro.navigateTo({
      url: `/pages/travel/pages/result/index?type=${queryType}&time=${params.time}&value=${params.value}`
    })
  }

  render() {
    let { queryType, params, placeholderValue } = this.state
    return (
      <View className='travelQuery'>
        <View className='travelQuery-content'>
          <View className='travelQuery-content-title'>
            {queryType !== 'city' ? '请选择一项或多项' : '请输入城市名'}
          </View>
          {queryType !== 'city' ? <View>
            <Picker mode='date' onChange={this.onDateChange}>
              <View className='login-input '>
                {params.time || '选择日期'}
              </View>
            </Picker>
          </View> : null}
          <Input className='login-input login-elsephone' type='text' onInput={this.onCarChange.bind(this)} placeholder={placeholderValue} />
          <AtButton onClick={this.onLogin.bind(this)} className='login-btn'>确认</AtButton>
        </View>
      </View>
    )
  }
}

export default TravelQuery
