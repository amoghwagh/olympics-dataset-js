    fetch('./data.json')
    .then(r => r.json())
    .then(data => {
        numberOfTimesHostedChart(data["NumberOfCities"])
    })


function numberOfTimesHostedChart(cityCountObj) {

    let cityCountViz = [];
     for (let key in cityCountObj) {
        let oneViz = {}
        oneViz["name"] = key;
        oneViz["y"] = cityCountObj[key];
        cityCountViz.push(oneViz);
        }
        console.log(cityCountViz)

        Highcharts.chart('OlympicsHost', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Number of times olympics hosted per city over the NOCs'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Hosted',
                colorByPoint: true,
                data: cityCountViz
            }]
        });

        
}

