import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import api from '../../../../api/index'
import './index.less'

class TravelResult extends Component {
  config = {
    navigationBarTitleText: '查询结果'
  }

  state = {
    total: 0,
    currentList: []
  }
  hasMore = true
  pageNumber = 1
  disabledScroll = false
  allList = []
  onScrolltolower() {
    console.log('分页开始')
    let { currentList } = this.state
    if (this.disabledScroll) {
      return
    }
    if (!this.hasMore) {
      return
    }
    this.pageNumber++
    this.disabledScroll = true
    currentList = this.list.slice(0, this.pageNumber * 10)
    console.log(currentList)
    this.setState({
      currentList
    }, () => {
      this.disabledScroll = false
      if ((this.list.length - currentList.length) < 10) {
        this.hasMore = false
      }
    })
  }

  async componentDidMount() {
    const { type, value, time } = this.$router.params
    this.getData(type, value, time)
  }

  async getData(type, value, time) {
    let { total, currentList } = this.state
    let res = await api.user.getVirusTrip()
    if (res.code === '200') {
      let data = JSON.parse(res.data)
      if (type === 'all') {
        this.list = data.data.list
        total = data.data.list.length
        currentList = this.list.slice(0, this.pageNumber * 10)
        console.log(currentList)
        this.setState({
          total,
          currentList
        })
      } else if (type === 'train') {
        this.list = data.data.list.filter(obj => {
          return obj.tripType === 'train'
        }).filter(obj => {
          return obj.tripNo.indexOf(value) >= 0
        }).filter(obj => {
          return obj.tripDate.indexOf(time) >= 0
        })
        total = this.list.length
        currentList = this.list.slice(0, this.pageNumber * 10)
        this.setState({
          total,
          currentList
        })
      } else if (type === 'plane') {
        this.list = data.data.list.filter(obj => {
          return obj.tripType === 'flight'
        }).filter(obj => {
          return obj.tripNo.indexOf(value) >= 0
        }).filter(obj => {
          return obj.tripDate.indexOf(time) >= 0
        })
        total = this.list.length
        currentList = this.list.slice(0, this.pageNumber * 10)
        this.setState({
          total,
          currentList
        })
      } else if (type === 'city') {
        this.list = data.data.list.filter(obj => {
          return obj.tripType === 'other'
        }).filter(obj => {
          return obj.tripNo.indexOf(value) >= 0
        })
        total = this.list.length
        currentList = this.list.slice(0, this.pageNumber * 10)
        this.setState({
          total,
          currentList
        })
      }
    }
  }

  render() {
    let { list, total, currentList } = this.state
    const enums= {
      'train': '火车',
      'bus': '公交',
      'flight': '飞机',
      'other': '其他',
      'coach': '大巴',
      'taxi': '出租车'
    }
    const enumsPlate = {
      'train': '车次',
      'bus': '车牌号',
      'flight': '航班号',
      'other': '地点',
      'coach': '车牌号',
      'taxi': '车牌号'
    }
    return (
      <View className='travelResult'>
        <View className='travelResult-header'>
          <View className='travelResult-title'>
            全部结果
          </View>
          <View className='travelResult-dec'>
            共{total}条结果
          </View>
        </View>
        <ScrollView scrollY lowerThreshold={20} onScrolltolower={this.onScrolltolower.bind(this)} className='travelResult-content'>
          {currentList.map((item, index) => {
            return (
              <View className='travelResult-item' key={item.id} index={index}>
                <View className='travelResult-left'>
                  <View className='travelResult-date'>{item.tripDate.substring(5)}</View>
                  <View className='travelResult-type'>{enums[item.tripType]}</View>
                </View>
                <View className='travelResult-right'>
                  <View className='travelResult-plate'>
                    {enumsPlate[item.tripType]}
                  </View>
                  <View className='travelResult-plateVlue'>{item.tripNo}</View>
                  <View className='travelResult-detail'>
                    <View className='travelResult-detail-left'>
                      <View className='travelResult-start'>患者出发</View>
                      <View className='travelResult-address'>{item.tripDepname || '无'}</View>
                      <View className='travelResult-time'>{item.tripDeptime.substring(5)}</View>
                    </View>
                    <View className='travelResult-detail-right'>
                      <View className='travelResult-start'>患者到达</View>
                      <View className='travelResult-address'>{item.tripArrname || '无'}</View>
                      <View className='travelResult-time'>{item.tripArrtime.substring(5)}</View>
                    </View>
                  </View>
                </View>
                <View className='travelResult-item-dot'>有肺炎患者乘坐</View>
              </View>
            )
          })}
          {total === 0 && <View className='noResult'>目前尚未发现该查询条件有新型肺炎确诊患者</View>}
        </ScrollView>
        
      </View>
    )
  }
}

export default TravelResult
