<template>
  <div class="charts">
    <div class="js-data-aggregation">
      <div class="individuals-businesses">
        <div class="data-aggregation__title">
          <h2 class="data-aggregation__h2">事项日推送情况</h2>
        </div>
        <div class="js-chart" id="chart1">
        </div>
      </div>
      <ul class="js-data-aggregation__ul">
        <li class="js-data-aggregation__list js-Lfloat">
          <div class="js-padding">
            <div class="data-aggregation__title">
              <h2 class="data-aggregation__h2">非会员事项推送TOP5</h2>
            </div>
            <div class="js-chart" id="chart2">
            </div>
          </div>

        </li>
        <li class="js-data-aggregation__list  js-Rfloat">
          <div class="js-padding">
            <div class="data-aggregation__title">
              <h2 class="data-aggregation__h2">会员事项推送TOP5</h2>
            </div>
            <div class="js-chart" id="chart5">
            </div>
          </div>
        </li>
        <li class="js-data-aggregation__list js-Lfloat">
          <div class="js-padding">
            <div class="data-aggregation__title">
              <h2 class="data-aggregation__h2">事项月推送情况</h2>
            </div>
            <div class="js-chart" id="chart4">
            </div>
          </div>
        </li>
        <li class="js-data-aggregation__list  js-Rfloat">
          <div class="js-padding">
            <div class="data-aggregation__title">
              <h2 class="data-aggregation__h2">事项年推送情况</h2>
            </div>
            <div class="js-chart" id="chart3">
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted: function () {
    (function () {
      var myChart = echarts.init(document.getElementById('chart1'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
          show: true,
          backgroundColor: "rgb(255, 255, 255)"
        },
        legend: {
          icon: 'circle',
          data: ["会员", "非会员"],
          backgroundColor: "rgb(255, 255, 255)",
          x: "right",
          y: "top",
          orient: "horizontal",
          borderWidth: 0,
          borderColor: "rgb(204, 204, 204)",
          itemHeight: 14,
          itemGap: 12,
          textStyle: {
            color: "#333",
            fontSize: 14,
            fontStyle: "normal"
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ["line", "bar", "stack", "tiled"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1/01", "1/03", "1/05", "1/07", "1/09", "1/11", "1/13", "1/15", "1/17", "1/19", "1/21", "1/23", "1/25"],
            position: "bottom",
            name: "",
            nameTextStyle: {
              color: "rgb(102, 102, 102)",
              fontSize: 14
            },
            scale: false,
            nameLocation: "start",
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisTick: {
              show: false
            },

          }
        ],
        yAxis: [
          {
            type: "value",
            name: "调用量",
            nameLocation: "end",
            nameTextStyle: {
              color: "rgb(153, 153, 153)",
              fontSize: 12,
              align: "left",
              fontStyle: "normal",
              fontWeight: "normal",
              baseline: "top"
            },
            scale: false,
            min: 0,
            max: 400,
            boundaryGap: false,
            splitNumber: 8,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(239, 239, 239)",
                type: "dotted",
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgb(224, 228, 236)",
                width: 1
              }
            },
            position: "top",
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            }
          }
        ],
        series: [
          {
            name: "会员",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [75, 150, 250, 54, 260, 350, 100, 200, 100, 60, 90, 160, 200],
            symbolSize: 3,
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
                  offset: 0,
                  color: '#ff7f50' //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              }
            }
          },

          {
            name: "非会员",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [10, 260, 330, 391, 390, 240, 150, 150, 80, 200, 150, 90, 130],
            symbolSize: 3,
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
                  offset: 0,
                  color: '#87cefa' //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              }
            }
          },
        ],
        backgroundColor: "rgba(0,0,0,0)",
        color: ["#ff7f50", "#87cefa"],
        grid: {
          borderWidth: 1,
          borderColor: "#ccc",
          x: 40,
          y: 30,
          x2: 15,
          y2: 35
        }
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })()

      ;
    (function () {
      var myChart = echarts.init(document.getElementById('chart2'));

      // 指定图表的配置项和数据
      var option1 = {
        grid: {
          borderWidth: 1,
          borderColor: "#ccc",
          x: 50,
          y: 5,
          x2: 28,
          y2: 35
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: "value",
          boundaryGap: [0, 0.01],
          splitArea: {
            areaStyle: {
              type: "default"
            },
            show: true
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(224, 228, 236)",
              width: 1
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666",
              fontSize: 14
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: 3
        }],
        yAxis: [{
          type: "category",
          data: ["事项1", "事项2", "事项3", "事项4", "事项5", "事项6"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(224, 228, 236)",
              width: 1
            }
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "rgb(102, 102, 102)",
              fontSize: 14
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: "",
          type: "bar",
          data: [168203, 108203, 98203, 88203, 78203, 68203],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: "rgb(104, 153, 219)",
              borderWidth: 1,
              barBorderRadius: [0, 5, 5, 0]
            },
            emphasis: {
              barBorderRadius: [0, 5, 5, 0]
            },

          },
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option1);
    })()

      ;
    (function () {
      var myChart = echarts.init(document.getElementById('chart3'));

      // 指定图表的配置项和数据
      var option2 = {
        grid: {
          borderWidth: 1,
          borderColor: "#ccc",
          x: 40,
          y: 30,
          x2: 15,
          y2: 35
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          icon: "circle",
          data: ["会员", "非会员"],
          x: "right"
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: ["2018", "2019", "2020", "2021"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(224, 228, 236)",
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666",
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },

            splitLine: {
              show: false
            },

          },

        ],
        yAxis: [
          {
            type: "value",
            name: "调用量",
            nameLocation: "end",
            nameTextStyle: {
              fontSize: 12,
              color: "rgb(153, 153, 153)"
            },
            axisLine: {
              lineStyle: {
                color: "rgb(224, 228, 236)",
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: "rgb(51, 51, 51)",
                fontSize: 14
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                width: 1,
                color: "rgb(239, 241, 246)"

              }
            },
            min: 30,
            max: 110,
            splitNumber: 8,
            nameLocation: "end",
            position: "bottom"
          }
        ],
        series: [
          {
            name: "会员",
            type: "bar",
            data: [43, 63.2, 55.6, 76.7, 95.6, 66],
            barMinHeight: 10,
            barWidth: 13,
            itemStyle: {
              normal: {

                barBorderRadius: [4, 4, 0, 0]
              },
              emphasis: {
                barBorderRadius: [4, 4, 0, 0]
              },

            },
          },
          {
            name: "非会员",
            type: "bar",
            data: [50, 66.4, 48.7, 70.7, 90.6, 62.2,],
            barMinHeight: 10,
            barWidth: 13,
            itemStyle: {
              normal: {

                barBorderRadius: [4, 4, 0, 0]
              },
              emphasis: {
                barBorderRadius: [4, 4, 0, 0]
              },

            },
          },


        ],
        color: ["rgb(104,219,206)", "rgb(104,153,219)"]
      }
        ;

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option2);
    })()

      ;
    (function () {
      var myChart = echarts.init(document.getElementById('chart4'));

      // 指定图表的配置项和数据
      var option3 = {
        title: {
          text: "",
          subtext: ""
        },
        tooltip: {
          trigger: "axis",
          show: true,
          backgroundColor: "rgb(255, 255, 255)"
        },
        legend: {
          icon: 'circle',
          data: ["会员", "非会员"],
          backgroundColor: "rgb(255, 255, 255)",
          x: "right",
          y: "top",
          orient: "horizontal",
          borderWidth: 0,
          borderColor: "rgb(204, 204, 204)",
          itemHeight: 14,
          itemGap: 12,
          textStyle: {
            color: "#333",
            fontSize: 14,
            fontStyle: "normal"
          }
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ["line", "bar", "stack", "tiled"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",],
            splitNumber: 12,
            position: "bottom",
            name: "",
            nameTextStyle: {
              color: "rgb(102, 102, 102)",
              fontSize: 14
            },
            scale: false,
            nameLocation: "start",
            axisLine: {
              lineStyle: {
                color: "rgb(224, 228, 236)",
                width: 1
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "调用量",
            nameLocation: "end",
            nameTextStyle: {
              color: "rgb(153, 153, 153)",
              fontSize: 12,
              align: "left",
              fontStyle: "normal",
              fontWeight: "normal",
              baseline: "top"
            },
            scale: false,
            min: 0,
            max: 400,
            boundaryGap: false,
            splitNumber: 8,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(239, 239, 239)",
                type: "dotted",
                width: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgb(224, 228, 236)",
                width: 1
              }
            },
            position: "top",
            axisLabel: {
              textStyle: {
                color: "#666666"
              }
            },
          }
        ],
        series: [
          {
            name: "会员",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [75, 150, 250, 54, 260, 350, 100, 200, 100, 60, 90, 160],
            symbolSize: 3,
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
                  offset: 0,
                  color: '#6cdccf' //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              }
            }
          },
          {
            name: "非会员",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [10, 260, 330, 391, 390, 240, 150, 150, 80, 200, 150, 90],
            symbolSize: 3,
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ //关键在这里, 设置面积渐变
                  offset: 0,
                  color: '#6899db' //这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
                }, {
                  offset: 1,
                  color: '#fff'
                }])
              }
            }
          }
        ],
        backgroundColor: "rgba(0,0,0,0)",
        color: ["#6cdccf", "#6899db"],
        grid: {
          borderWidth: 1,
          borderColor: "#ccc",
          x: 40,
          y: 30,
          x2: 15,
          y2: 35
        }
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option3);
    })()

      ;
    (function () {
      var myChart = echarts.init(document.getElementById('chart5'));

      // 指定图表的配置项和数据
      var option4 = {
        grid: {
          borderWidth: 1,
          borderColor: "#ccc",
          x: 50,
          y: 5,
          x2: 28,
          y2: 35
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: false,
              type: ["line", "bar"]
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        calculable: true,
        xAxis: [{
          type: "value",
          boundaryGap: [0, 0.01],
          splitArea: {
            areaStyle: {
              type: "default"
            },
            show: true
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(224, 228, 236)",
              width: 1
            }
          },
          axisLabel: {
            textStyle: {
              color: "#666666",
              fontSize: 14
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: 3
        }],
        yAxis: [{
          type: "category",
          data: ["事项1", "事项2", "事项3", "事项4", "事项5", "事项6"],
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgb(224, 228, 236)",
              width: 1
            }
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "rgb(102, 102, 102)",
              fontSize: 14
            }
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: "",
          type: "bar",
          data: [18203, 23489, 29034, 104970, 131744, 740000],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: "rgb(104, 219, 206)",
              borderWidth: 1,
              barBorderRadius: [0, 5, 5, 0]
            },
            emphasis: {
              barBorderRadius: [0, 5, 5, 0]
            },

          },
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option4);
    })()


  }
}
</script>
<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 100%;
}
.js-data-aggregation {
  background-color: #efefef;
  height: 100%;
  padding: 18px;
  box-sizing: border-box;
}
.individuals-businesses {
  padding: 0 25px;
  background-color: #fff;
}
.data-aggregation__title {
  overflow: hidden;
  padding: 11px 0px;
  border-bottom: 1px solid #e1e4ed;
}
.data-aggregation__h2 {
  margin-top: 2px;
  float: left;
  font-size: 16px;
  color: #333;
  border-left: 4px solid #31c17b;
  padding-left: 10px;
}
.js-data-aggregation__ul {
  overflow: hidden;
  font-size: 0;
  padding: 0;
}
.js-data-aggregation__list {
  display: inline-block;
  width: 49.29%;
  border: 1px solid #dde1ea;
  background-color: #fff;
  margin-top: 19px;
}
.js-padding {
  padding: 0 25px;
}
.js-chart {
  height: 230px;
  padding-top: 20px;
}
.js-Lfloat {
  float: left;
}
.js-Rfloat {
  float: right;
}
.js-shijian {
  font-size: 14px;
  color: #333333;
}
.js-sjkuang {
  position: relative;
  border: 1px solid #999;
  display: inline-block;
  border-radius: 5px;
}
.js-sjkuang input {
  outline: none;
  padding: 0 20px;
  width: 70px;
  height: 25px;
  border-radius: 5px;
  border: none;
}
.js-select-data {
  vertical-align: middle;
  appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border: 1px solid #999;
  width: 140px;
  height: 27px;
  padding: 0 23px;
  color: #333;
  border-radius: 5px;
}
.js-select-data::-ms-expand {
  display: none;
}
</style>
