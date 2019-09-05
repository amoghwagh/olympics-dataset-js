/*
1) Number of times olympics hosted per city over the NOCs - Piechart
2) Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
3) M/F participation by decade - column chart
4) Per season average age of athletes who participated in Boxing Men's Heavyweight - Line
5) Find out all medal winners from India per season - Table
*/
let fs = require('fs')

function NumberOfCities (athletesJSON) {
    let gamesSet = new Set();
    let cityCountViz = []
    let cityCountObj = athletesJSON.reduce((acc,event) => { //Counts the number of times olympics was held in each city
        if(!(gamesSet.has(event["Games"]))) {
            gamesSet.add(event["Games"]);
            (acc[event["City"]])? acc[event["City"]]++ : acc[event["City"]] = 1;
        }
        return acc;
        },{})

    return cityCountObj;
}

function topCountries (eventsJson,nocJson,number) {
    let noc = eventsJson.reduce((acc,event) => {
        if( event["Year"] > 2000 && event["Medal"] != 'NA' ) {
            if(acc[event["NOC"]]) {
                ( acc[event["NOC"]][event["Medal"]] ) ? acc[event["NOC"]][event["Medal"]]++ : acc[event["NOC"]][event["Medal"]] = 1;
                acc[event["NOC"]]["totalMedals"]++
            } 
                
            else
                (acc[event["NOC"]]) = { [event["Medal"]] : 1 ,
                                        totalMedals : 1  ,  
                                        key : event["NOC"]};
        }

        return acc; 
    },{})

    let topNoc = Object.values(noc).sort( (a,b) =>b["totalMedals"] - a["totalMedals"]).slice(0,number);
    var countryToRegionMap = new Map();
    for (let nocMapping of nocJson ) {
        countryToRegionMap.set(nocMapping["NOC"],nocMapping["region"])
    }
    let topCountries = topNoc.reduce((acc,noc)=> {
        acc[countryToRegionMap.get(noc["key"])] = {
            "Gold" : ( noc['Gold'] ) ? noc['Gold'] : 0,
            "Bronze" : ( noc['Bronze'] ) ? noc['Bronze'] : 0,
            "Silver" : ( noc['Silver'] ) ? noc['Silver'] : 0
        }
        return acc;
    },{})
    return topCountries
}

function NumberOfParticipants (athletesJSON) {
    let currentYear = new Date().getFullYear();
    let numberOfDecades = Math.ceil((currentYear-1890) / 10);
    var startDecade = 189;
    let decadeObjArray = new Array(1).fill(undefined)

    decadeObjArray = decadeObjArray.map(Object).map((ele) => {
            iteration = 0;
            while(iteration < numberOfDecades)
            {
                ele[startDecade] = {
                    "M" : new Set(),
                    "F" : new Set()
                }
                startDecade += 1;
                iteration++;
            }
        return ele;
    }) 

    let reducedJson = athletesJSON.reduce( (byYear,event) =>{
            let determiner = String(parseInt((event["Year"] / 10)))
            byYear[determiner][event["Sex"]].add(event["Name"])
        return byYear;
    },decadeObjArray[0])
    
    let participantsJson = {}
    
    for(let year of Object.keys(reducedJson)) {
        reducedJson[year]["M"] = reducedJson[year]["M"].size;
        reducedJson[year]["F"] = reducedJson[year]["F"].size;
        let lowerIndex = parseInt(year)*10;
        let higherIndex = ((parseInt(year)+1)*10-1);
        let newKey = String(lowerIndex).concat('-').concat(higherIndex)

        participantsJson[newKey] = Object.assign({},reducedJson[year])
    }
    return participantsJson

}

function averageAgeBoxing (athletesJSON) {
    let totalCountJson = athletesJSON.reduce( (countJson,event) => {
    if(event["Event"] == "Boxing Men's Heavyweight" && (event["Age"]) !=  "NA" ) {
        if(countJson[event["Year"]]) {
            countJson[event["Year"]]["totalAge"] += parseInt(event["Age"])
            countJson[event["Year"]]["totalCount"]++;
        }
        else
        {  
            countJson[event["Year"]] = {}
            countJson[event["Year"]]["totalAge"] = parseInt(event["Age"])
            countJson[event["Year"]]["totalCount"] = 1; 
        }
    }
    return countJson
    },{})
    
    for(let year of Object.keys(totalCountJson)) {
        totalCountJson[year]["average"] = totalCountJson[year]["totalAge"] / totalCountJson[year]["totalCount"];
        totalCountJson[year]["average"] = totalCountJson[year]["average"].toPrecision(4)
        delete totalCountJson[year]["totalAge"]
        delete totalCountJson[year]["totalCount"]
    }
    return totalCountJson
}

function medalWinners (athletesJSON) {
    let medalJson = athletesJSON.reduce( (medalCount, event) => {
        if(event["Medal"]!="NA" && event["NOC"] =="IND")
        {
            if(medalCount[event["Year"]]) {
                medalCount[event["Year"]].add(event["Name"])
            }
            else
            {
                medalCount[event["Year"]] = new Set();
                medalCount[event["Year"]].add(event["Name"])
            }
        }
        return medalCount
    },{})
    for(let year in medalJson) {
        medalJson[year] = Array.from(medalJson[year])
    }
    return medalJson
}

module.exports = {
    NumberOfCities : NumberOfCities,
    topCountries: topCountries,
    NumberOfParticipants: NumberOfParticipants,
    averageAgeBoxing : averageAgeBoxing,
    medalWinners : medalWinners
} 
