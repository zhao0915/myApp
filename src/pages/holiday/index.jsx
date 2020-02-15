import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio, Picker } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'

class Holiday extends Component {
  config = {
    navigationBarTitleText: '假期上报'
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
        // 离城时间
        leaveTime: '',
        // 交通工具
        vehicle: '',
        vehicleList: [],
        // 车次
        trainNumber: '',
        // 座位号
        seatNumber: '',
        // 行程
        trip: '',
        epidemicArea: '',
        epidemicAreaList: [],
        // 是否接触
        isContact1: '',
        isContact: false,
        // 是否异常
        isAbnormal1: '',
        isAbnormal: false,
        // 是否外出
        isOut1: '',
        isOut: false,
        elseInput: ''
      },
      yiquList: [
        {
          value: '安徽',
          text: '安徽',
          id: '1',
          checked: false
        },
        {
          value: '广东',
          text: '广东',
          id: '2',
          checked: false
        },
        {
          value: '河南',
          text: '河南',
          id: '3',
          checked: false
        },
        {
          value: '湖北',
          text: '湖北',
          id: '4',
          checked: false
        },
        {
          value: '江西',
          text: '江西',
          id: '5',
          checked: false
        },
        {
          value: '陕西',
          text: '陕西',
          id: '6',
          checked: false
        },
        {
          value: '浙江',
          text: '浙江',
          id: '7',
          checked: false
        },
        {
          value: '重庆',
          text: '重庆',
          id: '8',
          checked: false
        }
      ],
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
      isBodyList: [
        {
          value: '是',
          text: '是',
          id: '1',
          checked: false
        },
        {
          value: '否',
          text: '否',
          id: '2',
          checked: false
        }
      ],
      isHubeiList: [
        {
          value: '是',
          text: '是',
          id: '1',
          checked: false
        },
        {
          value: '否',
          text: '否',
          id: '2',
          checked: false
        }
      ],
      isOutList: [
        {
          value: '是',
          text: '是',
          id: '1',
          checked: false
        },
        {
          value: '否',
          text: '否',
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
    if (!info.isOut1) {
      Taro.showToast({
        title: '请您选择是否外出',
        icon: 'none'
      })
      return
    }
    if (!info.isContact1) {
      Taro.showToast({
        title: '请您选择是否接触重灾区人员（湖北籍)',
        icon: 'none'
      })
      return
    }
    if (!info.isAbnormal1) {
      Taro.showToast({
        title: '假期有无身体异常',
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
    if (info.epidemicAreaList.length > 0) {
      info.epidemicArea = info.epidemicAreaList.join(',')
    } else {
      info.epidemicArea
    }
    info.isContact = info.isContact1 === '是' ? true : false
    info.isAbnormal = info.isAbnormal1 === '是' ? true : false
    info.isOut = info.isOut1 === '是' ? true : false
    info.leaveTime = info.leaveTime + ' 00:00:00'
    let res = await api.user.addVacation(info)
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
  onCheckYiqu(item, e) {
    const { info } = this.state
    const yiquList = this.state.yiquList
    const cuurent = yiquList.find(v => v.id === item.id)
    const checked = cuurent.checked
    cuurent.checked = !checked
    this.setState({
      yiquList
    }, () => {
      info.epidemicAreaList = []
      yiquList.forEach(obj => {
        if (obj.checked) {
          info.epidemicAreaList.push(obj.text)
        }
        this.setState({
          info
        })
      })
      console.log(info.epidemicAreaList)
    })
    // this.props.onUpdate(info)
    e.stopPropagation()
  }
  onCheckOut(item, e) {
    const { info } = this.state
    let isOutList = this.state.isOutList
    const cuurent = isOutList.find(v => v.id === item.id)
    const checked = cuurent.checked
    isOutList = isOutList.map(v => {
      v.checked = false
      return v
    })
    cuurent.checked = !checked
    this.setState({
      isOutList
    }, () => {
      // info.symptomList = []
      info.isOut1 = ''
      isOutList.forEach(obj => {
        if (obj.checked) {
          info.isOut1 = obj.text
        }
        this.setState({
          info
        })
      })
    })
    e.stopPropagation()
  }
  onCheckConcat(item, e) {
    const { info } = this.state
    let isHubeiList = this.state.isHubeiList
    const cuurent = isHubeiList.find(v => v.id === item.id)
    const checked = cuurent.checked
    isHubeiList = isHubeiList.map(v => {
      v.checked = false
      return v
    })
    cuurent.checked = !checked
    this.setState({
      isHubeiList
    }, () => {
      // info.symptomList = []
      info.isContact1 = ''
      isHubeiList.forEach(obj => {
        if (obj.checked) {
          info.isContact1 = obj.text
        }
        this.setState({
          info
        })
      })
    })
    e.stopPropagation()
  }
  onCheckBody(item, e) {
    const { info } = this.state
    let isBodyList = this.state.isBodyList
    const cuurent = isBodyList.find(v => v.id === item.id)
    const checked = cuurent.checked
    isBodyList = isBodyList.map(v => {
      v.checked = false
      return v
    })
    cuurent.checked = !checked
    this.setState({
      isBodyList
    }, () => {
      // info.symptomList = []
      info.isAbnormal1 = ''
      isBodyList.forEach(obj => {
        if (obj.checked) {
          info.isAbnormal1 = obj.text
        }
        this.setState({
          info
        })
      })
    })
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
    info.leaveTime = event.detail.value
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
    const { params, roomname, list, symptomsList, info, yiquList, isHubeiList, isOutList, isBodyList } = this.state
    return (
      <View className='daily'>
        <View className='daily-body'>
          <Text className='daily-label'>离程日期</Text>
          <View>
            <Picker mode='date' onChange={this.onDateChange}>
              <View className='input '>
                {info.leaveTime || '选择时间'}
              </View>
            </Picker>
          </View>
          <Text className='daily-label mandatory'>交通工具</Text>
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
          <Text className='daily-label mandatory'>是否外出</Text>
          <View className='check-box'>
            {isOutList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheckOut.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <Text className='daily-label'>是否经过疫区</Text>
          <View className='check-box'>
            {yiquList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheckYiqu.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <Text className='daily-label mandatory'>是否接触重灾区人员（湖北籍）</Text>
          <View className='check-box'>
            {isHubeiList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheckConcat.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <Text className='daily-label mandatory'>假期有无身体异常</Text>
          <View className='check-box'>
            {isBodyList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheckBody.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <AtButton onClick={this.onSubmit.bind(this)} className='daily-btn'>提交</AtButton>
        </View>

      </View>
    )
  }
}

export default Holiday
