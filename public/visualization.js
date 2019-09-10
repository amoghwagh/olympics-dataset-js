/* eslint-disable no-undef */

function numberOfTimesHostedChart(cityCountObj) {
  const Countries = Object.keys(cityCountObj);
  const cityCountViz = Countries.map(country => {
    const oneViz = {};
    oneViz.name = country;
    oneViz.y = cityCountObj[country];
    return oneViz;
  });

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
    series: [
      {
        name: 'Hosted',
        colorByPoint: true,
        data: cityCountViz
      }
    ]
  });
}

function topCountriesChart(topCountriesJson) {
  const topCountries = Object.keys(topCountriesJson);
  const medalTypes = Object.keys(topCountriesJson[topCountries[0]]);

  //  To convert to Series Data
  const seriesData = medalTypes.map(medal => ({
    name: medal,
    data: topCountries.map(country => topCountriesJson[country][medal])
  }));

  Highcharts.chart('topCountry', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Top 10 Countries with Most Medals'
    },
    xAxis: {
      categories: Object.keys(topCountriesJson)
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
          color:
            // theme
            (Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
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
    series: seriesData
  });
}

function participantsChart(participantsJson) {
  const sortedOriginalKeys = Object.keys(participantsJson).sort(
    (a, b) => parseInt(a, 10) - parseInt(b, 10)
  ); //  Sorts the JSON

  const sortedJson = {};
  sortedOriginalKeys.map(key => {
    sortedJson[key] = participantsJson[key];
  }); //  Sorted JSON

  const sortedJsonKeys = Object.keys(sortedJson);
  const genders = Object.keys(sortedJson[sortedJsonKeys[0]]);

  //  To convert to Series Data
  const seriesData = genders.map(gender => ({
    name: gender,
    data: sortedJsonKeys.map(year => sortedJson[year][gender])
  }));

  Highcharts.chart('participants', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Male and Female Participants by Decade'
    },
    subtitle: {
      text: 'Source: Olympics.com'
    },
    xAxis: {
      categories: Object.keys(sortedJson),
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Participants'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.0f} participants</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: seriesData
  });
}

function averageAgeChart(averageCountJson) {
  const years = Object.keys(averageCountJson);
  const averageKey = Object.keys(averageCountJson[years[0]]);
  //  To convert to Series Data
  const seriesData = averageKey.map(avgKey => ({
    name: avgKey,
    data: years.map(year => parseFloat(averageCountJson[year][avgKey]))
  }));

  Highcharts.chart('averageAge', {
    chart: {
      type: 'line'
    },
    title: {
      text: "Average age per season of athletes who participated in Boxing Men's Heavyweight"
    },
    subtitle: {
      text: 'Source: Olympics.com'
    },
    xAxis: {
      categories: Object.keys(averageCountJson)
    },
    yAxis: {
      title: {
        text: 'Age'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: seriesData
  });
}

fetch('./data.json') // Data is fetched from the data.json file
  .then(r => r.json())
  .then(data => {
    numberOfTimesHostedChart(data.numberOfCities);
    topCountriesChart(data.topCountries);
    participantsChart(data.numberOfParticipants);
    averageAgeChart(data.averageAgeBoxing);
  });
