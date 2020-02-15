import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input, RadioGroup, Label, Radio } from '@tarojs/components'
import moment from 'moment'
import { AtButton } from 'taro-ui'
import './index.less'
import api from '../../api/index'

class Daily extends Component {
  config = {
    navigationBarTitleText: '健康日报'
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
        // 地址
        address: '',
        symptomList: [],
        elseInput: '',
        // 自测体温
        selfTemperature: '',
        // 当日体温
        dayTemperature: '',
        // 症状
        symptom: '',
        // 上报时间
        reportTime: ''
      },
      symptomsList: [
        {
          value: '无',
          text: '无',
          id: '1',
          checked: false
        },
        {
          value: '头疼',
          text: '头疼',
          id: '2',
          checked: false
        },
        {
          value: '发热',
          text: '发热',
          id: '3',
          checked: false
        },
        {
          value: '咳嗽',
          text: '咳嗽',
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
    if (!info.address) {
      Taro.showToast({
        title: '请获取您的位置',
        icon: 'none'
      })
      return
    }
    if (!info.selfTemperature) {
      Taro.showToast({
        title: '请选择自测体温',
        icon: 'none'
      })
      return
    }
    if (!info.dayTemperature) {
      Taro.showToast({
        title: '请填写当日体温',
        icon: 'none'
      })
      return
    }
    if (info.symptomList.length < 1) {
      Taro.showToast({
        title: '请选择症状',
        icon: 'none'
      })
      return
    } else {
      info.symptomList = info.symptomList.map(obj => {
        if (obj === '其他') {
          obj = obj + '-' + info.elseInput
        }
        return obj
      })
      console.log(info.symptomList)
      info.symptom = info.symptomList.join(',')
    }
    info.reportTime = info.reportTime + ' 00:00:00'
    let res = await api.user.addHealthy(info)
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
    // if (!info.isMultiple) {
    //   info.optionList = info.optionList.map(v => {
    //     v.checked = false
    //     return v
    //   })
    // }
    cuurent.checked = !checked
    this.setState({
      symptomsList
    }, () => {
      info.symptomList = []
      symptomsList.forEach(obj => {
        if (obj.checked) {
          info.symptomList.push(obj.text)
        }
        this.setState({
          info
        })
      })
      console.log(symptomsList)
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
      info.selfTemperature = ''
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
  onDayTemperature(event) {
    let { info } = this.state
    info.dayTemperature = event.target.value
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
          <Text className='daily-label'>填报日期</Text>
          <Input disabled className='input' type='text' value={info.reportTime}/>
          <Text className='daily-label mandatory'>当前所在位置</Text>
          {info.address && <Input disabled className='input address-input' type='text' value={info.address} />}
          <View className='location-btn' onClick={this.onGetLocation.bind(this)}>
            <Image className='location-img' src={require('./image/location.png')}></Image>
            点击获取位置
          </View>
          <Text className='daily-label mandatory'>自测体温</Text>
          <View className='check-box'>
            {list.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheckHot.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' />}
                </View>
              )
            })}
          </View>
          <Text className='daily-label mandatory'>当日体温</Text>
          <Input className='input' type='text' onInput={this.onDayTemperature.bind(this)} />
          <Text className='daily-label mandatory'>本人是否有以下症状</Text>
          <View className='check-box'>
            {symptomsList.map((item, index) => {
              return (
                <View className='check-item'>
                  <View onClick={this.onCheck.bind(this, item)}>
                    <Checkbox color={'#61C9DB'} checked={item.checked} className='box-meta__checked' />
                  </View>
                  <Text>{item.text}</Text>
                  {item.text === '其他' && <Input onInput={this.onElseChange.bind(this)} disabled={!item.checked} className='inputInner' type='text' /> }
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

export default Daily
