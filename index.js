        // Import Files
let fs = require('fs')
let csvToJsonFunc = require('./src/csvtojson.js');
let Olympics = require('./src/olympics.js')
let dataPath = './src/data.json'
csvToJsonFunc('./Dataset/athlete_events.csv').then((athlete_events) => {
        csvToJsonFunc('./Dataset/noc_regions.csv').then((noc_regions) => {
                let jsonData = {}
                jsonData["NumberOfCities"] = Olympics.NumberOfCities(athlete_events)
                jsonData["topCountries"] = Olympics.topCountries(athlete_events,noc_regions,10)
                jsonData["numberOfParticipants"] = Olympics.NumberOfParticipants(athlete_events)
                jsonData["averageAgeBoxing"] = Olympics.averageAgeBoxing(athlete_events)
                jsonData["medalWinners"] = Olympics.medalWinners(athlete_events)
                fs.writeFileSync('./public/data.json',JSON.stringify(jsonData,null,2))      
        })
})

