let athlete_json = [{
    ID: '133306',
    Name: 'Yu Fengkai',
    Sex: 'M',
    Age: '21',
    Height: '193',
    Weight: '91',
    Team: 'China',
    NOC: 'CHN',
    Games: '2016 Summer',
    Year: '2016',
    Season: 'Summer',
    City: 'Rio de Janeiro',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'NA'
  },
  {
    ID: '133538',
    Name: 'Yushan Nijiati',
    Sex: 'M',
    Age: '22',
    Height: '188',
    Weight: '91',
    Team: 'China',
    NOC: 'CHN',
    Games: '2008 Summer',
    Year: '2008',
    Season: 'Summer',
    City: 'Beijing',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'NA'
  },{
    ID: '133538',
    Name: 'Yushan Nijiati',
    Sex: 'M',
    Age: 'NA',
    Height: '188',
    Weight: '91',
    Team: 'China',
    NOC: 'CHN',
    Games: '2008 Summer',
    Year: '2008',
    Season: 'Summer',
    City: 'Beijing',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'NA'
  },
  {
    ID: '134137',
    Name: 'Pyotr Ivanovich Zayev',
    Sex: 'M',
    Age: '26',
    Height: '179',
    Weight: '87',
    Team: 'Soviet Union',
    NOC: 'URS',
    Games: '2008 Summer',
    Year: '2008',
    Season: 'Summer',
    City: 'Moskva',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'Silver'
  },
  {
    ID: '135486',
    Name: 'Viktor Valeryevich Zuyev',
    Sex: 'M',
    Age: '21',
    Height: '188',
    Weight: '91',
    Team: 'Belarus',
    NOC: 'BLR',
    Games: '2008 Summer',
    Year: '2008',
    Season: 'Summer',
    City: 'Athina',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'Silver'
  },
  {
    ID: '135486',
    Name: 'Viktor Valeryevich Zuyev',
    Sex: 'M',
    Age: '25',
    Height: '188',
    Weight: '91',
    Team: 'Belarus',
    NOC: 'BLR',
    Games: '2008 Summer',
    Year: '2008',
    Season: 'Summer',
    City: 'Beijing',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'NA'
  },
  {
    ID: '135486',
    Name: 'Viktor Valeryevich Zuyev',
    Sex: 'M',
    Age: '25',
    Height: '188',
    Weight: '91',
    Team: 'Belarus',
    NOC: 'BLR',
    Games: '2016 Summer',
    Year: '2016',
    Season: 'Summer',
    City: 'Beijing',
    Sport: 'Boxing',
    Event: "Boxing Men's Heavyweight",
    Medal: 'NA'
  }]

let expected_output = {
    "2016": {
        "average": "23.00"
      },
      "2008": {
        "average": "23.50"
      }
}

module.exports = {
    athlete_json: athlete_json,
    expected_output: expected_output
}