import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Chart from 'taro-echarts'
import './index.less'
class EpidemicLine extends Component {
  state = {
    data: null,
    chinadata: null
  }
  componentDidMount() {
  }
  render() {
    let { lineData } = this.props
    return (
      <View className='epidemic-line'>
        {lineData && lineData.x.length > 0 && <View className='epidemic-map-content'>
          <Chart
            height='230px'
            option={{
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['新增确诊', '新增疑似'],
                x: 'right',      //可设定图例在左、右、居中
                // y: 'center',
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                  rotate: '65'
                },
                data: lineData.x
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name: '新增确诊',
                  color: '#ED514E',
                  type: 'line',
                  stack: '总量',
                  data: lineData.y1
                },
                {
                  name: '新增疑似',
                  type: 'line',
                  color: '#FFE6BD',
                  stack: '总量',
                  data: lineData.y2
                }
              ]
            }}
          />
        </View>}
      </View>
    )
  }
}

export default EpidemicLine
