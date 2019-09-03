/*
1) Number of times olympics hosted per city over the NOCs - Piechart
2) Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
3) M/F participation by decade - column chart
4) Per season average age of athletes who participated in Boxing Men’s Heavyweight - Line
5) Find out all medal winners from India per season - Table
*/

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
    let countryToRegionMap = new Map();

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

//     let categories = Object.keys(topCountries)
//     let medalsArray = new Array(3).fill(0);
//     for(let medals in medalsArray) {
//         medalsArray[medals] = new Array();
//     }

//     for(let country in topCountries) {
//         medalsArray[0].push(topCountries[country]["Gold"])
//         medalsArray[1].push(topCountries[country]["Silver"])
//         medalsArray[2].push(topCountries[country]["Bronze"])
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
    topCountries: topCountries
} 
