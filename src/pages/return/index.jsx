import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio, Picker } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'

class ReturnBack extends Component {
  config = {
    navigationBarTitleText: '出行情况'
  }
  constructor(props) {
    super(props)
    this.state = {
      params: {
        dateNow: '',
        ishot: false,
        address: '',
        temperature: '',
        symptoms: []
      },
      info: {
        // 返程时间
        returnTime: '',
        // 交通工具
        vehicle: '',
        vehicleList: [],
        // 车次
        trainNumber: '',
        // 座位号
        seatNumber: '',
        // 行程
        trip: '',
        elseInput: ''
      },
      symptomsList: [
        {
          value: '自驾',
          text: '自驾',
          id: '1',
          checked: false
        },
        {
          value: '火车',
          text: '火车',
          id: '2',
          checked: false
        },
        {
          value: '飞机',
          text: '飞机',
          id: '3',
          checked: false
        },
        {
          value: '轮船',
          text: '轮船',
          id: '4',
          checked: false
        },
        {
          value: '其他',
          text: '其他',
          id: '5',
          checked: false
        }
      ],
      list: [
        {
          value: '正常',
          text: '正常',
          id: '1',
          checked: false
        },
        {
          value: '发热',
          text: '发热',
          id: '2',
          checked: false
        }
      ],
      roomname: ''
    }
  }
  async onSubmit() {
    const { info } = this.state
    // if (!info.trainNumber) {
    //   Taro.showToast({
    //     title: '请您填写车次',
    //     icon: 'none'
    //   })
    //   return
    // }
    // if (!info.seatNumber) {
    //   Taro.showToast({
    //     title: '请您填写车厢/座位号',
    //     icon: 'none'
    //   })
    //   return
    // }
    if (!info.trip) {
      Taro.showToast({
        title: '请您填写行程记录',
        icon: 'none'
      })
      return
    }
    if (info.vehicleList.length < 1) {
      Taro.showToast({
        title: '请选择交通工具出行方式',
        icon: 'none'
      })
      return
    } else {
      info.vehicleList = info.vehicleList.map(obj => {
        if (obj === '其他') {
          obj = obj + '-' + info.elseInput
        }
        return obj
      })
      console.log(info.vehicleList)
      info.vehicle = info.vehicleList.join(',')
    }
    info.returnTime = info.returnTime + ' 00:00:00'
    let res = await api.user.addTrip(info)
    if (res.code === '200') {
      Taro.reLaunch({
        url: '/pages/home/index'
      })
    } else {
      Taro.showToast({
        title: '提交失败',
        icon: 'none'
      })
    }
    console.log(info)
    console.log(res)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  componentDidMount() {
    const time = new Date()
    const { info } = this.state
    info.reportTime = moment(time).format('YYYY/MM/DD').replace(/\//g, '-')
    this.setState({
      info
    })
  }
  onCheck(item, e) {
    const { info } = this.state
    const symptomsList = this.state.symptomsList
    const cuurent = symptomsList.find(v => v.id === item.id)
    const checked = cuurent.checked
    cuurent.checked = !checked
    this.setState({
      symptomsList
    }, () => {
      info.vehicleList = []
      symptomsList.forEach(obj => {
        if (obj.checked) {
          info.vehicleList.push(obj.text)
        }
        this.setState({
          info
        })
      })
      console.log(info.vehicleList)
    })
    // this.props.onUpdate(info)
    e.stopPropagation()
  }
  onCheckHot(item, e) {
    const { info } = this.state
    let list = this.state.list
    const cuurent = list.find(v => v.id === item.id)
    const checked = cuurent.checked
    list = list.map(v => {
      v.checked = false
      return v
    })
    cuurent.checked = !checked
    this.setState({
      list
    }, () => {
      // info.symptomList = []
      list.forEach(obj => {
        if (obj.checked) {
          info.selfTemperature = obj.text
        }
        this.setState({
          info
        })
      })
    })
    // this.props.onUpdate(info)
    e.stopPropagation()
  }
  onElseChange(event) {
    let { info } = this.state
    info.elseInput = event.target.value
    this.setState({
      info
    })
  }
  // 座位
  onSeatNumber(event) {
    let { info } = this.state
    info.seatNumber = event.target.value
    this.setState({
      info
    })
  }
  //  车次
  onTrainNumber(event) {
    let { info } = this.state
    info.trainNumber = event.target.value
    this.setState({
      info
    })
  }
  // 行程
  onTrip(event) {
    let { info } = this.state
    info.trip = event.target.value
    this.setState({
      info
    })
  }
  onDateChange(event) {
    let { info } = this.state
    info.returnTime = event.detail.value
    this.setState({
      info
    })
  }
  onGetLocation() {
    const that = this
    Taro.getLocation({ type: 'gcj02', sHighAccuracy: true }).then(res => {
      console.log(res.latitude)
      console.log(res.longitude)
      wx.chooseLocation({
        latitude: res.latitude,
        longitude: res.longitude,
        scale: 18,
        success(name) {
          let { info } = that.state
          info.address = name.name
          that.setState({
            info
          })
        }
      })
    })
  }
  
  render() {
    const { params, roomname, list, symptomsList, info } = this.state
    return (
      <View className='daily'>
        <View className='daily-body'>
          <Text className='daily-label'>返程日期</Text>
          <View>
            <Picker mode='date' onChange={this.onDateChange}>
              <View className='input '>
                {info.returnTime || '选择时间'}
              </View>
            </Picker>
          </View>
          <Text className='daily-label mandatory'>交通工具出行方式</Text>
          <View className='check-box'>
            {symptomsList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheck.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <Text className='daily-label'>火车车次车厢/航班班次</Text>
          <Input className='input' type='text' onInput={this.onTrainNumber.bind(this)} />
          <Text className='daily-label'>车厢/座位号</Text>
          <Input className='input' type='text' onInput={this.onSeatNumber.bind(this)} />
          <Text className='daily-label mandatory'>行程记录</Text>
          <Input className='input' type='text' onInput={this.onTrip.bind(this)} />
          
          <AtButton onClick={this.onSubmit.bind(this)} className='daily-btn'>提交</AtButton>
        </View>
        
      </View>
    )
  }
}

export default ReturnBack
