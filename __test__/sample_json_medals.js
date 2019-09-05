let athlete_json = [{
    ID: '111257',
    Name: 'Surinder Singh Sodhi Shokar',
    Sex: 'M',
    Age: '23',
    Height: '178',
    Weight: '83',
    Team: 'India',
    NOC: 'IND',
    Games: '1980 Summer',
    Year: '1980',
    Season: 'Summer',
    City: 'Moskva',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  },
  {
    ID: '111268',
    Name: 'Balbir Singh Dosanjh, Sr.',
    Sex: 'M',
    Age: '23',
    Height: 'NA',
    Weight: 'NA',
    Team: 'India',
    NOC: 'IND',
    Games: '1948 Summer',
    Year: '1948',
    Season: 'Summer',
    City: 'London',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  },
  {
    ID: '111268',
    Name: 'Balbir Singh Dosanjh, Sr.',
    Sex: 'M',
    Age: '27',
    Height: 'NA',
    Weight: 'NA',
    Team: 'India',
    NOC: 'IND',
    Games: '1948 Summer',
    Year: '1948',
    Season: 'Summer',
    City: 'Helsinki',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  },
  {
    ID: '114974',
    Name: 'Charles Stephen',
    Sex: 'M',
    Age: '26',
    Height: 'NA',
    Weight: 'NA',
    Team: 'India',
    NOC: 'IND',
    Games: '1956 Summer',
    Year: '1956',
    Season: 'Summer',
    City: 'Melbourne',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  },
  {
    ID: '116377',
    Name: 'William Patrick "Pat" Sullivan',
    Sex: 'M',
    Age: '22',
    Height: '173',
    Weight: 'NA',
    Team: 'India',
    NOC: 'IND',
    Games: '1980 Summer',
    Year: '1980',
    Season: 'Summer',
    City: 'Los Angeles',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  },
  {
    ID: '117232',
    Name: 'Dung Dung Sylvanus',
    Sex: 'M',
    Age: '31',
    Height: '160',
    Weight: '62',
    Team: 'India',
    NOC: 'IND',
    Games: '1980 Summer',
    Year: '1980',
    Season: 'Summer',
    City: 'Moskva',
    Sport: 'Hockey',
    Event: "Hockey Men's Hockey",
    Medal: 'Gold'
  }]

let expected_output = {  
'1948': [ 'Balbir Singh Dosanjh, Sr.' ],
'1956': [ 'Charles Stephen' ],
'1980': [ 'Surinder Singh Sodhi Shokar','William Patrick "Pat" Sullivan','Dung Dung Sylvanus' ]
}

module.exports = {
    athlete_json: athlete_json,
    expected_output: expected_output
}


