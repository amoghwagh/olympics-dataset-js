// Import Files
const fs = require('fs');
const Olympics = require('./src/olympics.js');
const dataPath = './src/data.json';
const csvToJson = require('csvtojson');

//  CSV is converted to JSON
csvToJson()
  .fromFile('./dataset/athlete_events.csv')
  .then(athlete_events => {
    csvToJson()
      .fromFile('./dataset/noc_regions.csv')
      .then(noc_regions => {
        let jsonData = {}; //Empty Json object is assigned and later populated with outputs from each function
        jsonData['numberOfCities'] = Olympics.numberOfCities(athlete_events);
        jsonData['topCountries'] = Olympics.topCountries(athlete_events, noc_regions, 10);
        jsonData['numberOfParticipants'] = Olympics.numberOfParticipants(athlete_events);
        jsonData['averageAgeBoxing'] = Olympics.averageAgeBoxing(athlete_events);
        jsonData['medalWinners'] = Olympics.medalWinners(athlete_events);

        fs.writeFileSync('./public/data.json', JSON.stringify(jsonData, null, 2)); //Javascript Object is written to JSON
      });
  });
