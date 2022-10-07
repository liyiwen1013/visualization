(function () {
    var myChart = echarts.init(document.querySelector('.china-hot-map .chart'));
    //Echart的配置选项
    var option = {
        tooltip: { //悬浮时显示
            formatter: function (params) {
                var info = '<p style="font-size:18px">' + params.name + '</p>'
                // var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>'
                return info;
            },
            backgroundColor: "#ff7f50", //提示标签背景颜色
            textStyle: {
                color: "#fff"
            } //提示标签字体颜色
        },
        //左侧小导航图标
        visualMap: {
            show: true,
            x: 'right',
            // y: 'center',
            bottom: "0%", //组件离容器下侧的距离,'20%'
            itemWidth: 5, //图形的宽度，即长条的宽度。
            itemHeight: 5, //图形的高度，即长条的高度。            
            textGap: 5, //两端文字主体之间的距离，单位为px
            textStyle: { //文本样式
                fontSize: 10,
                color: "#fff",
            },
            itemGap: 4, //每两个图元之间的间隔距离，单位为px      
            splitList: [
                {
                    start: 1501,
                    end: 100000
                }, {
                    start: 1001,
                    end: 1500
                },
                {
                    start: 801,
                    end: 1000
                }, {
                    start: 501,
                    end: 800
                },
                {
                    start: 101,
                    end: 500
                }, {
                    start: 0,
                    end: 100
                },
            ],
            color: ['#663366', '#990033', '#ff0033', '#99cccc', '#cccc00', '#ffcc99']
        },
        series: {
            name: '中国',
            type: 'map',
            zoom: 1.2, //这里是关键，一定要放在 series中，地图缩放比例的配置
            mapType: 'china',
            label: { //地图中的文字
                normal: { //正常显示
                    show: false, //显示省份标签
                    textStyle: {
                        fontSize: 10,
                        color: '#fff'
                    }
                },
                emphasis: { //悬浮时显示
                    show: true, //对应的鼠标悬浮效果
                }
            },
            data: []
        }
    };
    // 异步获取数据
    $.get(
        domain + "/api5",
        function (data) {
            var dataMap = data;
            var specialMap = [];
            // 对dataMap进行处理，使其可以直接在页面上展示
            for (var i = 0; i < specialMap.length; i++) {
                for (var j = 0; j < dataMap.length; j++) {
                    if (specialMap[i] === dataMap[j].name) {
                        dataMap[j].selected = true;
                        break;
                    }
                }
            }
            option.series.data = dataMap
        }
    )
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
