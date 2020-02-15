import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'

class Travel extends Component {
  config = {
    navigationBarTitleText: '行程查询'
  }
  async componentDidMount() {
  }
  onQueryTrain() {
    Taro.navigateTo({
      url: '/pages/travel/pages/query/index?type=train'
    })
  }
  onQueryPlane() {
    Taro.navigateTo({
      url: '/pages/travel/pages/query/index?type=plane'
    })
  }
  onQueryCity() {
    Taro.navigateTo({
      url: '/pages/travel/pages/query/index?type=city'
    })
  }
  onQueryAll() {
    Taro.navigateTo({
      url: '/pages/travel/pages/result/index?type=all&time=&value='
    })
  }
  render() {
    return (
      <View className='travel'>
        <View className='travel-content'>
          <View className='travel-content-item' onClick={this.onQueryTrain.bind(this)}>
            <Image className='travel-content-img' src={require('./images/train.png')}></Image>
            <View className='travel-content-right'>
              <View className='travel-content-title'>查询您乘坐的火车</View>
              <View className='travel-content-dec'>输入日期/车次，查看该车次是否有肺炎患者通行</View>
            </View>
          </View>
          <View className='travel-content-item plane' onClick={this.onQueryPlane.bind(this)}>
            <Image className='travel-content-img' src={require('./images/plane.png')}></Image>
            <View className='travel-content-right'>
              <View className='travel-content-title'>查询您乘坐的飞机</View>
              <View className='travel-content-dec'>输入日期/航班号，查看该航班是否有肺炎患者通行</View>
            </View>
          </View>
          <View className='travel-content-item city' onClick={this.onQueryCity.bind(this)}>
            <Image className='travel-content-img' src={require('./images/city.png')}></Image>
            <View className='travel-content-right'>
              <View className='travel-content-title'>按城市查询</View>
              <View className='travel-content-dec'>查看该城市中是否有肺炎患者出现的航班/火车/公交/地点</View>
            </View>
          </View>
          <View className='travel-content-all' onClick={this.onQueryAll.bind(this)}>查看全部</View>
        </View>
      </View>
    )
  }
}

export default Travel
