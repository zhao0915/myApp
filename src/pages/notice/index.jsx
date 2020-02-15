import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import moment from 'moment'
import './index.less'
import api from '../../api/index'

class Mine extends Component {
  config = {
    navigationBarTitleText: '公司通知'
    // navigationBarTextStyle: 'white',
    // navigationBarBackgroundColor: '#61C9DB'
  }
  state = {
    list: []
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  async componentWillMount() {
    let { list } = this.state
    let res = await api.user.getNoticeList()
    console.log(res)
    if (res.code === '200') {
      list = res.data
    }
    this.setState({
      list
    })
  }
  onNoteceDetail(item) {
    Taro.navigateTo({
      url: `/pages/noticedetail/index?subjectEQ=${item.subject}`
    })
  }
  render() {
    let { list } = this.state
    return (
      <View className='notice'>
        {list.map((item, index) => {
          return (
            <View className='notice-item' onClick={this.onNoteceDetail.bind(this, item)}>
              <View className='notice-item-left'>
                <View className='notice-item-title'>
                  {item.subject}
                </View>
                <View className='notice-item-time'>
                  时间：{moment(item.createdTime).format('YYYY/MM/DD HH:mm:ss').replace(/\//g, '-')}
                </View>
                <View className='notice-item-content'>
                  {item.content}
                </View>
              </View>
              <Image className='notice-item-right' src={require('./image/hui.png')}></Image>
            </View>
          )
        })}
      </View>
    )
  }
}

export default Mine
