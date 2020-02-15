
import Taro, { Component } from '@tarojs/taro'
import api from '../../api/index'
import { mergeInfo } from '../../actions/user'
import { connect } from '@tarojs/redux'
import store from '../../store'
import './index.less'
import { View } from '@tarojs/components'
import getWechatToken from '../../utils/auth/check'

@connect(function (state) {
  return { userInfo: state.user }
})

class Guide extends Component {
  config = {
    navigationStyle: 'custom',
  }
  constructor(props) {
    super(props);
    this.state = {
      img: 'https://repair-static.flyoil.cn/seat/1576225009819/bindphoneImage.png',
      isPhone: false,
      isMeeting: false,
      tmplIds: []
    }
  }

  async componentWillMount() {
    Taro.hideHomeButton()
    console.log(this.props.userInfo.phone)
    if (!this.props.userInfo.phone) {
      this.setState({
        isPhone: true,
        isMeeting: false
      })
      return false
    }
  }
  async componentWillReceiveProps(nextProps) {
    if (!nextProps.userInfo.phone) {
      this.setState({
        isPhone: true,
        isMeeting: false
      })
      return false
    }else {
      Taro.redirectTo({
        url: `/pages/loginfo/index`
      })
    }
  }

  onCheck() {
    console.log('检查session')
    const _that = this
    Taro.checkSession({
      success(res) {
        console.log(res)
        console.log("处于登录态");

      　　　　},
      　　　　fail(res) {
        getWechatToken()
        　　　　　console.log("需要重新登录");
      　　　　}
    })
  }
  async onGetPhoneNumber(e) {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      let res = {}
      try {
        console.log(e.detail)
        console.log('开始授权')
        res = await api.user.updatePhone({
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        })
        // 手机号接口回来
        console.log(res)
        console.log('手机号接口回来')

        if (!res.data.phone) {
          Tip.showToast('手机授权失败~')
          return
        }
        console.log(res.data.phone)
        store.dispatch(mergeInfo({
          phone: res.data.phone,
          isPhoneAuth: true
        }))
        console.log('手机授权成功')
        this.setState({
          isPhone: false,
          isMeeting: true
        })
      } catch (e) {
        // try 失败
        console.log('try 失败' + e)
      }
    }
  }

  render() {
    const { isMeeting, isPhone } = this.state
    return (
      <View className='guide-wrap'>
        {isPhone && (
          <View>
            <Image src='https://repair-static.flyoil.cn/seat/1576225009819/bindphoneImage.png' className='top' mode='aspectFill' />
            <View className='title'>易企安心</View>
            <View className='line'></View>
            <View className='txt'>
              易企安心需要获取您的手机号用于通知服务
              </View>
            <View className='SignIn'>
              立即绑定
                <Button
                open-type='getPhoneNumber'
                className='openType'
                onGetPhoneNumber={this.onGetPhoneNumber}
                plain
              >
                授权
                </Button>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Guide
