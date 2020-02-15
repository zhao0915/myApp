import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import classnames from 'classnames'
import './index.less'
import moment from 'moment'
import api from '../../api/index'

class Mine extends Component {
  config = {
    navigationBarTitleText: '公司通知详情'
    // navigationBarTextStyle: 'white',
    // navigationBarBackgroundColor: '#61C9DB'
  }
  state = {
    item: {}
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  async componentWillMount() {
    const { subjectEQ } = this.$router.params
    let { item } = this.state
    let res = await api.user.getNoticeList({ subjectEQ: subjectEQ })
    // console.log(res)
    if (res.code === '200' && res.data.length > 0) {
      item = res.data[0]
    }
    this.setState({
      item
    })
    // console.log(subjectEQ)
  }
  onOption() {
    Taro.navigateTo({
      url: '/pages/option/index'
    })
  }
  render() {
    const { item } = this.state
    return (
      <View className='noticedetail'>
        <View className='noticedetail-title'>
          {item.subject}
        </View>
        <View className='noticedetail-user'>
          发布人：{item.userName}
        </View>
        <View className='noticedetail-time'>
          时间：{moment(item.createdTime).format('YYYY/MM/DD HH:mm:ss').replace(/\//g, '-')}
        </View>
        <View className='noticedetail-content'>
          内容：{item.content}
        </View>
      </View>
    )
  }
}

export default Mine
