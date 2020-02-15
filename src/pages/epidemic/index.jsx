import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, Image } from '@tarojs/components'
import api from '../../api/index'
import Chart from 'taro-echarts'
import geoJson from './mapData'
import Statice from './components/statice/index'
import './index.less'
import classnames from 'classnames'
import EpidemicMap from './components/map'
import EpidemicLine from './components/line'
class Epidemic extends Component {
  config = {
    navigationBarTitleText: '疫情信息'
  }
  state = {
    data: null,
    chinaList: [],
    chinaTotal: {},
    provinceList: [],
    elseList: [],
    lineData: {
      x: [],
      y1: [],
      y2: []
    },
    chinaDayList: [],
    cityList: [
      {
        name: '辽宁',
        quezhen: '116',
        siwang: '1',
        zhiyu: '20',
        isOpen: false,
        list: [
          {
            name: '沈阳',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          },
          {
            name: '大连',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          }
        ]
      },
      {
        name: '北京',
        quezhen: '116',
        siwang: '1',
        zhiyu: '20',
        isOpen: false,
        list: [
          {
            name: '朝阳',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          },
          {
            name: '海淀',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          }
        ]
      },
      {
        name: '湖北',
        quezhen: '116',
        siwang: '1',
        zhiyu: '20',
        isOpen: false,
        list: [
          {
            name: '武汉',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          },
          {
            name: '黄冈',
            quezhen: '116',
            siwang: '1',
            zhiyu: '20'
          }
        ]
      }
    ]
  }
  async componentDidMount() {
    let { provinceList, elseList, chinaTotal, chinaDayList, lineData } = this.state
    let res = await api.user.getCityConditionList()
    if (res.code === '200') {
      let data = JSON.parse(res.data)
      console.log(data)
      chinaTotal = data.data.chinaTotal
      chinaDayList = data.data.chinaDayList.map(item => {
        lineData.x.push(item.date.substring(5))
        lineData.y1.push(item.today.confirm)
        lineData.y2.push(item.today.suspect)
        return item
      })
      console.log(lineData)
      provinceList = data.data.areaTree.find(v => v.name === '中国').children
      provinceList = provinceList.map(item => {
        item.value = item.total.confirm
        return item
      })
      elseList = data.data.areaTree.slice(1)
      provinceList = provinceList.map(obj => {
        obj.isOpen = false
        return obj
      })
      this.setState({
        provinceList,
        lineData,
        elseList,
        chinaTotal,
        chinaDayList
      })
      // console.log(data.data.areaTree)
    }
  }
  onToggle(item) {
    const provinceList = this.state.provinceList
    const cuurent = provinceList.find(v => v.name === item.name)
    cuurent.isOpen = !cuurent.isOpen
    this.setState({
      provinceList
    })
  }
  onBeforeSetOptions(echarts) {
    echarts.registerMap('map', geoJson)
  }
  render() {
    let { provinceList, elseList, chinaTotal, chinaDayList, lineData } = this.state
    return (
      <View className='epidemic'>
        <Image src={require('./images/ebg.png')} className='epidemic-banner'></Image>
        <Statice allInfo={chinaTotal}></Statice>
        <View className='epidemic-map'>
          <View className='epidemic-map-title'>疫情地图</View>
          <EpidemicMap provinceList={provinceList}></EpidemicMap>
        </View>
        <View className='epidemic-map'>
          <View className='epidemic-map-title'>疫情趋势</View>
          <EpidemicLine lineData={lineData}></EpidemicLine>
        </View>
        <View className='epidemic-content'>
          <View className='epidemic-content-title'>国内疫情</View>
          <View className='epidemic-content-city'>
            <View className='epidemic-content-head'>
              <View className='epidemic-head-item diqu'>地区</View>
              <View className='epidemic-head-item quezhen'>确诊</View>
              <View className='epidemic-head-item siwang'>死亡</View>
              <View className='epidemic-head-item zhiyu'>治愈</View>
            </View>
            {provinceList.map((item, index) => {
              return (
                <View className='epidemic-content-item' key={item} index={index} onClick={this.onToggle.bind(this, item)}>
                  <View className='epidemic-provinve'>
                    <View className='epidemic-provinve-item'>{item.name}</View>
                    <View className='epidemic-provinve-item'>{item.total.confirm}</View>
                    <View className='epidemic-provinve-item'>{item.total.dead}</View>
                    <View className='epidemic-provinve-item'>{item.total.heal}</View>
                    <Image src={require('./images/atop.png')} className={classnames('epidemic-provinve-icon', {
                      open: item.isOpen
                    })}></Image>
                  </View>
                  {item.isOpen && <View className='epidemic-provinve-body'>
                    {item.children.map((v, i) => {
                      return (
                        <View className='epidemic-city' key={v} index={i}>
                          <View className='epidemic-city-item'>{v.name}</View>
                          <View className='epidemic-city-item'>{v.total.confirm}</View>
                          <View className='epidemic-city-item'>{v.total.dead}</View>
                          <View className='epidemic-city-item'>{v.total.heal}</View>
                        </View>
                      )
                    })}
                  </View>} 
                </View>
              )
            })}
          </View>
          
        </View>
        <View className='epidemic-content'>
          <View className='epidemic-content-title'>国外疫情</View>
          <View className='epidemic-content-city'>
            <View className='epidemic-content-head'>
              <View className='epidemic-head-item diqu'>地区</View>
              <View className='epidemic-head-item quezhen'>确诊</View>
              <View className='epidemic-head-item siwang'>死亡</View>
              <View className='epidemic-head-item zhiyu'>治愈</View>
            </View>
            {elseList.map((item, index) => {
              return (
                <View className='epidemic-content-item' key={item} index={index} onClick={this.onToggle.bind(this, item)}>
                  <View className='epidemic-provinve'>
                    <View className='epidemic-provinve-item'>{item.name}</View>
                    <View className='epidemic-provinve-item'>{item.total.confirm}</View>
                    <View className='epidemic-provinve-item'>{item.total.dead}</View>
                    <View className='epidemic-provinve-item'>{item.total.heal}</View>
                  </View>
                </View>
              )
            })}
          </View>

        </View>
        <View className='epidemic-bot'>
          <Image className='botImag' src={require('./images/logobottom.png')}></Image>
        </View>
      </View>
    )
  }
}

export default Epidemic
