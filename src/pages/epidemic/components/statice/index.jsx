import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './index.less'

class Panel extends Component {

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    let { allInfo } = this.props
    return (
      <View className='statice'>
        <View className='statice-title'>
          全国数据
        </View>
        <View className='statice-body'>
          <View className='statice-all'>
            <View className='statice-all-item statice-all-quezhen'>
              <View className='statice-all-label'>确诊</View>
              <View className='statice-all-value'>{allInfo.total.confirm}</View>
              <View className='statice-all-today'><Text className='todayText'>较昨日</Text>+{allInfo.today.confirm}</View>
            </View>
            <View className='statice-all-item statice-all-yisi'>
              <View className='statice-all-label'>疑似</View>
              <View className='statice-all-value'>{allInfo.total.suspect}</View>
              <View className='statice-all-today'><Text className='todayText'>较昨日</Text>+{allInfo.today.suspect}</View>
            </View>
            <View className='statice-all-item statice-all-siwang'>
              <View className='statice-all-label'>死亡</View>
              <View className='statice-all-value'>{allInfo.total.dead}</View>
              <View className='statice-all-today'><Text className='todayText'>较昨日</Text>+{allInfo.today.dead}</View>
            </View>
            <View className='statice-all-item statice-all-zhiyu'>
              <View className='statice-all-label'>治愈</View>
              <View className='statice-all-value'>{allInfo.total.heal}</View>
              <View className='statice-all-today'><Text className='todayText'>较昨日</Text>+{allInfo.today.heal}</View>
            </View>
          </View>
          {/* <View className='statice-work'>
            <View className='statice-work-title'>
              工作地数据
            </View>
            <View className='statice-work-body'>
              <View className='statice-work-item'>
                <View className='statice-work-label'>确诊</View>
                <View className='statice-work-value'><Text className='work-quezhen'>297</Text>例</View>
              </View>
              <View className='statice-work-item'>
                <View className='statice-work-label'>疑似</View>
                <View className='statice-work-value'><Text className='work-yisi'>76</Text>例</View>
              </View>
              <View className='statice-work-item'>
                <View className='statice-work-label'>死亡</View>
                <View className='statice-work-value'><Text className='work-siiwang'>1</Text>例</View>
              </View>
              <View className='statice-work-item'>
                <View className='statice-work-label'>治愈</View>
                <View className='statice-work-value'><Text className='work-zhiyu'>32</Text>例</View>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    )
  }
}

export default Panel
