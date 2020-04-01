
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
var data = [];        // 指定图表的配置项和数据
var now = new Date();
var oneDay = 24 * 3600 * 1000;
var value = Math.random()*40;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

var option = {
    title: {
        text: 'Temperature-Humidity'
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
    now = new Date(+now + oneDay);
    value = value + Math.random() * 11 - 5;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}  
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

setInterval(function () {
    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }
    myChart.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);

