        // Import Files
let fs = require('fs')
let csvToJsonFunc = require('./src/csvtojson.js');
let Olympics = require('./src/olympics.js')

csvToJsonFunc('./Dataset/athlete_events.csv').then((athlete_events) => {
        csvToJsonFunc('./Dataset/noc_regions.csv').then((noc_regions) => {
                console.log(Olympics.NumberOfCities(athlete_events)); 
                console.log(Olympics.topTenCountries(athlete_events,noc_regions))
        })  
})
