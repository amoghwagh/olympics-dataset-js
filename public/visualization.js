    fetch('./data.json')
    .then(r => r.json())
    .then(data => {
        numberOfTimesHostedChart(data["NumberOfCities"])
        topCountriesChart(data["topCountries"])
    })


function numberOfTimesHostedChart(cityCountObj) {

     let cityCountViz = [];
     for (let key in cityCountObj) {
        let oneViz = {}
        oneViz["name"] = key;
        oneViz["y"] = cityCountObj[key];
        cityCountViz.push(oneViz);
        }

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
function topCountriesChart(topCountries) {
     
    let medalsArray = new Array(3).fill(0);
    for(let medals in medalsArray) {
        medalsArray[medals] = new Array();
    }

    for(let country in topCountries) {
        medalsArray[0].push(topCountries[country]["Gold"])
        medalsArray[1].push(topCountries[country]["Silver"])
        medalsArray[2].push(topCountries[country]["Bronze"])
    }

    Highcharts.chart('topCountry', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 10 Countries with most medals'
        },
        xAxis: {
            categories: Object.keys(topCountries)
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total medals'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [{
            name: 'Gold',
            data: medalsArray[0]
        }, {
            name: 'Silver',
            data: medalsArray[1]
        }, {
            name: 'Bronze',
            data: medalsArray[2]
        }]
    });
}

        

