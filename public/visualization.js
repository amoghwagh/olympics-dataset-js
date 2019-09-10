/* eslint-disable no-undef */
function myObjectMap(curObj, appliedFunction) {
  const obj = {};
  const curObjKeys = Object.keys(curObj);
  curObjKeys.map(eachKey => {
    obj[eachKey] = appliedFunction(curObj[eachKey]);
  });
  return obj;
}

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

function topCountriesChart(topCountries) {
  const seriesData = {}; //  To convert to Series Data
  myObjectMap(topCountries, country => {
    const medalTypes = Object.keys(country); //  Gets the medal Types
    for (medal of medalTypes) {
      if (seriesData[medal]) {
        seriesData[medal].data.push(country[medal]); // Pushes the value of Medal Type
      } else {
        //  Otherwise creates an empty object and assigns name and data to it
        seriesData[medal] = {};
        seriesData[medal].name = medal;
        seriesData[medal].data = [];
        seriesData[medal].data.push(country[medal]);
      }
    }
  });

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
    series: Object.values(seriesData)
  });
}

function participantsChart(participantsJson) {
  const sortedKeys = Object.keys(participantsJson).sort((a, b) => parseInt(a) - parseInt(b)); //  Sorts the JSON
  const sortedJson = {};
  for (key of sortedKeys) {
    sortedJson[key] = { ...participantsJson[key] }; // Deep Copies the JSON
  }

  const seriesData = {}; //  To convert to Series Data
  myObjectMap(sortedJson, decade => {
    const genders = Object.keys(decade); //  Gets the Genders
    for (gender of genders) {
      if (seriesData[gender]) {
        seriesData[gender].data.push(decade[gender]); // Pushes the value of Gender Type
      } else {
        //  Otherwise creates an empty object and assigns name and data to it
        seriesData[gender] = {};
        seriesData[gender].name = gender;
        seriesData[gender].data = [];
        seriesData[gender].data.push(decade[gender]);
      }
    }
  });

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
    series: Object.values(seriesData)
  });
}

function averageAgeChart(averageCountJson) {
  const seriesData = {}; //  To convert to Series Data
  myObjectMap(averageCountJson, year => {
    const average = Object.keys(year)[0]; //  Gets the name average
    if (seriesData[average]) {
      seriesData[average].data.push(parseFloat(year[average])); // Pushes the value of Average
    } else {
      //  Otherwise creates an empty object and assigns name and data to it
      seriesData[average] = {};
      seriesData[average].name = average;
      seriesData[average].data = [];
      seriesData[average].data.push(parseFloat(year[average]));
    }
  });

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
    series: Object.values(seriesData)
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
