import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import './index.less'

class Panel extends Component {

  componentWillReceiveProps() {
  }
  itemClick(item) {
    console.log(item)
    switch (item.name) {
      case '健康日报':
        this.goDaily()
        break
      case '返程上报':
        this.goReturn()
        break
      case '假期上报':
        this.goHoliday()
        break
      case '高危车次查询':
        this.goTravel()
        break
      case '疫情统计':
        this.goEpidemic()
        break
      default:
        break
    }
  }
  goTravel() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: `/pages/travel/index`
    })
  }
  goEpidemic() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: `/pages/epidemic/index`
    })
  }
  goDaily() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: `/pages/daily/index`
    })
  }
  goReturn() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: `/pages/return/index`
    })
  }
  goHoliday() {
    const { phone, relaname } = this.props.userInfo
    if (!phone) {
      Taro.navigateTo({ url: '/pages/guide/index' })
      return
    } else if (!relaname) {
      Taro.navigateTo({ url: '/pages/loginfo/index' })
      return
    }
    Taro.navigateTo({
      url: `/pages/holiday/index`
    })
  }

  render() {
    const { panelList } = this.props
    return (
      <View className='panel'>
        {panelList.map((v, i) => {
          return (
            <View className='panel-box'>
              <View className='panel-title'>{v.title}</View>
              <View className='panel-body'>
                {v.list.map((item, index) => {
                  return (
                    <View className='panel-item' key={item.id} onClick={this.itemClick.bind(this, item)}>
                      <Image className='panel-icon' src={item.icon}></Image>
                      <View className='panel-name'>{item.name}</View>
                    </View>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default Panel
