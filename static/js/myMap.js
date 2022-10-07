(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".map .chart"));
    // 指定配置和数据

    var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
    //var planePath = 'arrow';

    var option = {
        tooltip: {
            trigger: "item",
            formatter: function (params, ticket, callback) {
                if (params.seriesType == "effectScatter") {
                    return "线路：" + params.data.name + "" + params.data.value[2];
                } else if (params.seriesType == "lines") {
                    return (
                        params.data.fromName +
                        " -> " +
                        params.data.toName +
                        "<br />" +
                        params.data.value + "%"
                    );
                } else {
                    return params.name;
                }
            }
        },
        geo: {
            map: "china",
            label: {
                emphasis: {
                    show: true,
                    color: "#fff"
                }
            },
            roam: false,
            //   放大我们的地图
            zoom: 1,
            itemStyle: {
                normal: {
                    areaColor: "rgba(43, 196, 243, 0.42)",
                    borderColor: "rgba(43, 196, 243, 1)",
                    borderWidth: 1
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            }
        },
        series: [
            {
                name: "Top3",
                type: "lines",
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: "red", //arrow箭头的颜色
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: "#fff",
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: []
            },
            {
                name: "Top3",
                type: "lines",
                zlevel: 2,
                symbol: ["none", "arrow"],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: "#fff",
                        width: 1,
                        opacity: 0.6,
                        curveness: 0.2
                    }
                },
                data: []
            },
            {
                name: "Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                    brushType: "stroke"
                },
                label: {
                    normal: {
                        show: true,
                        position: "right",
                        formatter: "{b}"
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: "#fff"
                    },
                    emphasis: {
                        areaColor: "#2B91B7"
                    }
                },
                data: []
            }
        ]
    };
    // 异步获取数据
    $.get(
        domain + "/api4",
        function (data) {
            option.series[0].data = data[0]
            option.series[1].data = data[0]
            // 目的名
            // option.series[2].data = data[1]
        }
    )
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();