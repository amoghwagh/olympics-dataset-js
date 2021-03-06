let athlete_json = [{
    ID: '30',
    Name: 'Pepijn Aardewijn',
    Sex: 'M',
    Age: '26',
    Height: '189',
    Weight: '72',
    Team: 'Netherlands',
    NOC: 'NED',
    Games: '1996 Summer',
    Year: '1996',
    Season: 'Summer',
    City: 'Atlanta',
    Sport: 'Rowing',
    Event: "Rowing Men's Lightweight Double Sculls",
    Medal: 'Silver'
  },
  {
    ID: '30',
    Name: 'Pepijn Aardewijn',
    Sex: 'M',
    Age: '30',
    Height: '189',
    Weight: '72',
    Team: 'Netherlands',
    NOC: 'NED',
    Games: '2000 Summer',
    Year: '2000',
    Season: 'Summer',
    City: 'Atlanta',
    Sport: 'Rowing',
    Event: "Rowing Men's Lightweight Double Sculls",
    Medal: 'NA'
  },
  {
    ID: '31',
    Name: 'Evald rma (rman-)',
    Sex: 'M',
    Age: '24',
    Height: '174',
    Weight: '70',
    Team: 'Estonia',
    NOC: 'EST',
    Games: '1936 Summer',
    Year: '1936',
    Season: 'Summer',
    City: 'Berlin',
    Sport: 'Athletics',
    Event: "Athletics Men's Pole Vault",
    Medal: 'NA'
  },
  {
    ID: '32',
    Name: 'Olav Augunson Aarnes',
    Sex: 'M',
    Age: '23',
    Height: 'NA',
    Weight: 'NA',
    Team: 'Norway',
    NOC: 'NOR',
    Games: '1912 Summer',
    Year: '1912',
    Season: 'Summer',
    City: 'Stockholm',
    Sport: 'Athletics',
    Event: "Athletics Men's High Jump",
    Medal: 'NA'
  },
  {
    ID: '33',
    Name: 'Mika Lauri Aarnikka',
    Sex: 'M',
    Age: '24',
    Height: '187',
    Weight: '76',
    Team: 'Norway',
    NOC: 'FIN',
    Games: '1992 Summer',
    Year: '1992',
    Season: 'Summer',
    City: 'Barcelona',
    Sport: 'Sailing',
    Event: "Sailing Men's Two Person Dinghy",
    Medal: 'NA'
  },
  {
    ID: '34',
    Name: 'Jamale (Djamel-) Aarrass (Ahrass-)',
    Sex: 'M',
    Age: '30',
    Height: '187',
    Weight: '76',
    Team: 'France',
    NOC: 'FRA',
    Games: '2012 Summer',
    Year: '2012',
    Season: 'Summer',
    City: 'London',
    Sport: 'Athletics',
    Event: "Athletics Men's 1,500 metres",
    Medal: 'NA'
  },
  {
    ID: '34',
    Name: 'Aditya Dhiman',
    Sex: 'M',
    Age: '30',
    Height: '187',
    Weight: '76',
    Team: 'France',
    NOC: 'FRA',
    Games: '2012 Summer',
    Year: '2012',
    Season: 'Summer',
    City: 'London',
    Sport: 'Athletics',
    Event: "Athletics Men's 1,500 metres",
    Medal: 'NA'
  }
  ]

let expected_output = {
"Atlanta": 2,
"Barcelona": 1,
"Berlin": 1,
"London": 1,
"Stockholm": 1
}

module.exports = {
    athlete_json: athlete_json,
    expected_output: expected_output
}