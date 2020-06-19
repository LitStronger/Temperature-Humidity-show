/* 仪表盘 */
var gauge = echarts.init(document.getElementById('gauge'));
let gaugeOption = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
    },
    toolbox: {
        feature: {
            restore: {},
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '业务指标',
            type: 'gauge',
            min: 10,
            max: 90,
            radius: '100%',
            axisLine: {
                lineStyle: {
                    width: 15 // 修改宽度
                }
            },
            axisLabel: {
                distance: -10 // 刻度值与表盘的距离
            },
            detail: {formatter: '{value}%'},
            data: [{value: 5, name: '低压'}]
        }
    ]
};

gauge.setOption(gaugeOption);

// setInterval(function () {
//     option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
//     myChart.setOption(option, true);
// },2000);



/* 曲线图 */

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var data = [];        // 指定图表的配置项和数据
var oneDay = 24 * 3600 * 1000;
var now = new Date() - 10*oneDay;

var oneMin = 60 *1000
var oneHour = 3600*1000
var value = Math.random()*5+28;
for (var i = 0; i < 100; i++) {
    data.push(randomData());
}
var option = {
    title: {
        text: 'Temperature-History'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },            
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: true
        }
    },            
    series: [{
        type: 'line',
        showSymbol:false,
        // smooth: true,
        // data: [5, 20, 36, 10, 10, 20, 30],
        data: data,
        color:  '#66ccff'
    }]
};
function randomData() {
    now = new Date(+now + oneMin);
    //now = new Date(+now +oneMin)
    var h=now.getHours();
    var mm=now.getMinutes();
    h=h>9?h:"0"+h;
    mm=mm>9?mm:"0"+mm;
    console.log([now.getFullYear(), now.getMonth() + 1, now.getDate(),].join('/')+ ' '+h + ':'+ mm)
    value = value + Math.random() * 2-1;
    return {
        name: now.toString(),
        value: [
            //[now.getFullYear(), now.getMonth() + 1, now.getDate(), ' ',h , ':', mm].join('/'),//+' '+hour+':00',
            [now.getFullYear(), now.getMonth() + 1, now.getDate(),].join('/')+ ' '+h + ':'+ mm,
           // [now.getMonth() + 1, now.getDate()].join('/'),
            //Math.round(value)
            value

        ]
    };
}  
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// setInterval(function () {
//     for (var i = 0; i < 5; i++) {
//         data.shift();
//         data.push(randomData());
//     }
//     myChart.setOption({
//         series: [{
//             data: data
//         }]
//     });
// }, 20000);

