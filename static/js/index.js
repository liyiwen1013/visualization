// 域名
var domain = "http://127.0.0.1:8000";
// ajax改为同步
$.ajaxSettings.async = false;

// 仪表盘模块
(function () {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".gauge .chart"));
  // 指定配置和数据
  var option = {
    series: [{
      type: "gauge",
      barWidth: "35%",
      max: 10,
      radius: "92",
      itemStyle: {
        barBorderRadius: 5
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} %',
        color: 'auto',
        fontSize: 20
      },
      data: [{
        value: 70,
        name: "死亡率",
        lineStyle: {
          color: 'auto',
        }
      }],
      // 仪表盘轴线(轮廓线)相关配置
      axisLine: {
        show: true,
        lineStyle: {
          width: 15,
        }
      },
      axisLabel: {
        color: 'auto',
        length: 10,
        distance: 10,
        fontSize: 10
      },
      splitLine: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisTick: {
        distance: -30,
        length: 6,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
    }]
  };

  // 异步获取数据
  $.get(
      domain + "/api1",
      function (data) {
        option.series[0].data[0].value = data
      }
  )
  // 把配置给实例对象
  myChart.setOption(option);
  // 让图表跟随屏幕自适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 折线图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));
  // 指定配置和数据
  var option = {
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: []
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: {
        name: "确诊人数",
        type: "line",
        stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data: []
      }
  };

  // 异步获取数据
  $.get(
      domain + "/api2",
      function (data) {
        option.xAxis.data = data[1]
        option.series.data = data[0]
      }
  )
  // 把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 散点图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".scatter .chart"));
  // 指定配置和数据
  option = {
    tooltip: {
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: {
      symbolSize: 4,
      data: [],
      type: 'scatter'
    }
  };

  // 异步获取数据
  $.get(
      domain + "/api3",
      function (data) {
        option.series.data = data
      }
  )
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼形图定制
(function () {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  // 指定配置
  var option = {
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: {
      name: "点位统计",
      type: "pie",
      // 如果radius是百分比则必须加引号
      radius: ["10%", "70%"],
      center: ["50%", "42%"],
      roseType: "radius",
      data: [],
      // 修饰饼形图文字相关的样式 label对象
      label: {
        fontSize: 10
      },
      // 修饰引导线样式
      labelLine: {
        // 连接到图形的线长度
        length: 10,
        // 连接到文字的线长度
        length2: 10
      }
    }
  };
  // 异步获取数据
  $.get(
      domain + "/api6",
      function (data) {
        option.series.data = data
      }
  )
  // 把配置给实例对象
  myChart.setOption(option);
  // 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 主题河流图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".themeRiver .chart"));
  // 指定配置和数据
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#eee',
          width: 1,
          type: 'solid'
        }
      }
    },
    legend: {
      data: ['人民日报', '央视网', '新华社', '国家卫健委'],
      textStyle: { color: "#868bb0" },
    },
    singleAxis: {
      top: 50,
      bottom: 50,
      axisTick: {
        inside: true
      },
      axisLine: {
        lineStyle: {
          color: "#a9adbe"
        }
      },
      type: 'time',
      axisPointer: {
        animation: true,
        label: {
          show: true
        },
        inside: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          opacity: 0.2
        }
      }
    },
    series: {
      type: 'themeRiver',
      emphasis: {
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.8)'
        }
      },
      data: [],
      label: {
        normal: {
          show: false,
          color: "#a9adbe",
          inside: false
        }
      }
    }
  };
  // 异步获取数据
  $.get(
      domain + "/api7",
      function (data) {
        option.series.data = data
      }
  )
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 词云图模块
(function () {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".ciyun  .chart"));
  // 指定配置项和数据
  var option = {
    backgroundColor: '',
    tooltip: {
      show: false
    },
    series: {
      type: 'wordCloud',
      gridSize: 1,
      sizeRange: [12, 55],
      rotationRange: [-45, 0, 45, 90],
      textStyle: {
        normal: {
          color: function () {
            return 'rgb(' +
              Math.round(Math.random() * 255) +
              ', ' + Math.round(Math.random() * 255) +
              ', ' + Math.round(Math.random() * 255) + ')'
          }
        }
      },
      left: 'center',
      top: 'center',
      right: null,
      bottom: null,

      // width: '96%',
      // height: '100%',
      // width: 300,
      // height: 200,
      // top: 20,
      data: []
    }
  };
  // 异步获取数据
  $.get(
      domain + "/api8",
      function (data) {
        option.series.data = data
      }
  )
  // 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();