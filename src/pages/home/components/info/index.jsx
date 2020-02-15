import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './index.less'

class Info extends Component {

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { userInfo } = this.props
    return (
      <View className='info'>
        <View className='content'>
          <Image className='info-bg' src={require('../../image/bg.png')}></Image>
          <View className='info-avatar'>
            <open-data type="userAvatarUrl"></open-data>
          </View>
          <View className='info-basic'>
            <View className='info-name'>
              {userInfo.relaname === null ? (
                <open-data type="userNickName" style='color:#fff'></open-data>
              ) : (userInfo.relaname)}
            </View>
            <View className='info-job'>{userInfo.department || '部门'}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default Info
