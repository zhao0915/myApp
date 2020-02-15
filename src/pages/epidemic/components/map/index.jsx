import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Chart from 'taro-echarts'
import geoJson from '../../china'
import './index.less'
class EpidemicMap extends Component {
  state = {
    data: null,
    chinadata: null
  }
  componentDidMount() {
    // this.loadData()
    const chinadata = [
      { name: "湖北", value: 48206 },
      { name: "广东", value: 1241 },
      { name: "河南", value: 1169 },
      { name: "浙江", value: 1145 },
      { name: "湖南", value: 968 },
      { name: "安徽", value: 910 },
      { name: "江西", value: 872 },
      { name: "江苏", value: 570 },
      { name: "重庆", value: 518 },
      { name: "山东", value: 506 },
      { name: "四川", value: 451 },
      { name: "黑龙江", value: 395 },
      { name: "北京", value: 366 },
      { name: "上海", value: 313 },
      { name: "福建", value: 279 },
      { name: "河北", value: 265 },
      { name: "陕西", value: 229 },
      { name: "广西", value: 222 },
      { name: "海南", value: 157 },
      { name: "云南", value: 155 },
      { name: "贵州", value: 135 },
      { name: "山西", value: 126 },
      { name: "辽宁", value: 116 },
      { name: "天津", value: 113 },
      { name: "甘肃", value: 87 },
      { name: "吉林", value: 84 },
      { name: "宁夏", value: 64 },
      { name: "新疆", value: 63 },
      { name: "内蒙古", value: 61 },
      { name: "香港", value: 50 },
      { name: "青海", value: 18 },
      { name: "台湾", value: 18 },
      { name: "澳门", value: 10 },
      { name: "西藏", value: 1 }
    ]
    const data = [
      {
        name: "郑州市",
        value: 100
      },
      {
        name: "洛阳市",
        value: 10
      },
      {
        name: "开封市",
        value: 20
      },
      {
        name: "信阳市",
        value: 30
      },
      {
        name: "驻马店市",
        value: 40
      },
      {
        name: "南阳市",
        value: 41
      },
      {
        name: "周口市",
        value: 15
      },
      {
        name: "许昌市",
        value: 25
      },
      {
        name: "平顶山市",
        value: 35
      },
      {
        name: "新乡市",
        value: 35
      },
      {
        name: "漯河市",
        value: 35
      },
      {
        name: "商丘市",
        value: 35
      },
      {
        name: "三门峡市",
        value: 35
      },
      {
        name: "济源市",
        value: 35
      },
      {
        name: "焦作市",
        value: 35
      },
      {
        name: "安阳市",
        value: 35
      },
      {
        name: "鹤壁市",
        value: 35
      },
      {
        name: "濮阳市",
        value: 35
      },
      {
        name: "开封市",
        value: 45
      },
    ]
    this.setState({ data, chinadata })
  }
  onBeforeSetOptions(echarts) {
    console.log(geoJson)
    echarts.registerMap('map', geoJson)
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }
  render() {
    let { data, cityList, chinadata } = this.state
    let { provinceList } = this.props
    console.log(provinceList)
    return (
      <View className='epidemic-map'>
        {data ? <View className='epidemic-map-content'>
          <Chart
            onBeforeSetOption={this.onBeforeSetOptions.bind(this)}
            height='300px'
            option={{
              tooltip: {
                "trigger": "item",
                "confine": true,
                "formatter": (p) => {
                  // console.log(JSON.stringify(p));
                  let dataCon = p.data,
                    txtCon = `${dataCon.name}：${dataCon.value}`
                  return txtCon
                }
              },
              // visualMap: {
              //   min: 0,
              //   max: 100,
              //   left: 'left',
              //   top: 'bottom',
              //   calculable: true,
              //   show: false
              // },
              visualMap: {
                show: true,
                type: "piecewise",
                left: 0,
                bottom: "0",
                align: "left",
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                  fontSize: 10
                },
                pieces: [
                  { min: 1000, label: '1000人以上', color: '#ED514E' },
                  { min: 100, max: 999, label: '100-999人', color: '#FF8F66' },
                  { min: 10, max: 99, label: '10-99人', color: '#FFB769' },
                  { min: 1, max: 9, label: '1-9人', color: '#FFE6BD' }
                ]
              },
              series: [{
                type: 'map',
                mapType: 'map',
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 8
                    }
                  },
                  emphasis: {
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#389BB7',
                    areaColor: '#fff',
                  },
                  emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                  }
                },
                animation: false,
                data: provinceList
              }]
            }}
          />
        </View> : null}
      </View>
    )
  }
}

export default EpidemicMap
