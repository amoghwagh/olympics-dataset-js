/*
1) Number of times olympics hosted per city over the NOCs - Piechart
2) Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
3) M/F participation by decade - column chart
4) Per season average age of athletes who participated in Boxing Men’s Heavyweight - Line
5) Find out all medal winners from India per season - Table
*/

function NumberOfCities (athletesJSON) {
    let gamesSet = new Set();
    let totalCount = 0;
    let cityCountViz = []
    let cityCountObj = athletesJSON.reduce((acc,event) => { //Counts the number of times olympics was held in each city
        if(!(gamesSet.has(event["Games"]))) {
            gamesSet.add(event["Games"]);
            (acc[event["City"]])? acc[event["City"]]++ : acc[event["City"]] = 1;
            totalCount++;
        }
        return acc;

        },{})
        console.log(totalCount)
        
    for (let key in cityCountObj) {
        let oneViz = {}
        oneViz["name"] = key;
        oneViz["y"] = (cityCountObj[key]/totalCount)*100;
        cityCountViz.push(oneViz);
    }
    return cityCountViz;
}

function topTenCountries (eventsJson,nocJson) {
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

    let topTenNoc = Object.values(noc).sort( (a,b) =>b["totalMedals"] - a["totalMedals"]).slice(0,10);
    let countryToRegionMap = new Map();

    for (let nocMapping of nocJson ) {
        countryToRegionMap.set(nocMapping["NOC"],nocMapping["region"])
    }
    let topTenCountries = topTenNoc.reduce((acc,noc)=> {
        acc[countryToRegionMap.get(noc["key"])] = {
            "Gold" : ( noc['Gold'] ) ? noc['Gold'] : 0,
            "Bronze" : ( noc['Bronze'] ) ? noc['Bronze'] : 0,
            "Silver" : ( noc['Silver'] ) ? noc['Silver'] : 0
        }
        return acc;
    },{})
    return topTenCountries

//     let categories = Object.keys(topTenCountries)
//     let medalsArray = new Array(3).fill(0);
//     for(let medals in medalsArray) {
//         medalsArray[medals] = new Array();
//     }

//     for(let country in topTenCountries) {
//         medalsArray[0].push(topTenCountries[country]["Gold"])
//         medalsArray[1].push(topTenCountries[country]["Silver"])
//         medalsArray[2].push(topTenCountries[country]["Bronze"])
//     }

//     let series = [{
//         name: 'Gold',
//         data: medalsArray[0]
//     }, {
//         name: 'Silver',
//         data: medalsArray[1]
//     }, {
//         name: 'Bronze',
//         data: medalsArray[2]
//     }]
}

module.exports = {
    NumberOfCities : NumberOfCities,
    topTenCountries: topTenCountries
} 
