        // Import Files
let fs = require('fs')
let csvToJsonFunc = require('./src/csvtojson.js');
let Olympics = require('./src/olympics.js')


csvToJsonFunc('./Dataset/athlete_events.csv').then((athlete_events) =>{
    console.log(Olympics.NumberOfCities(athlete_events));    
})
