/*
1) Number of times olympics hosted per city over the NOCs - Piechart
2) Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
3) M/F participation by decade - column chart
4) Per season average age of athletes who participated in Boxing Men's Heavyweight - Line
5) Find out all medal winners from India per season - Table
*/

// Number of times olympics hosted per city over the NOCs - Piechart
function NumberOfCities(athletesJSON) {
  const gamesSet = new Set(); // New Set is Defined for Each Game
  const cityCountObj = athletesJSON.reduce((acc, event) => { //Counts the number of times olympics was held in each city
    if (!(gamesSet.has(event["Games"]))) {
      gamesSet.add(event["Games"]);
      (acc[event["City"]]) ? acc[event["City"]]++: acc[event["City"]] = 1; //Count for Each City is increased based on Games Set
    }
    return acc;
  }, {})

  return cityCountObj;
}

// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
function topCountries(eventsJson, nocJson, number) {
  const noc = eventsJson.reduce((acc, event) => {
    if (event["Year"] > 2000 && event["Medal"] != 'NA') { //Checks if year>2000 and if the athlete has won a medal
      if (acc[event["NOC"]]) { //If NOC is present then medal count is increased based on the type of medal won
        (acc[event["NOC"]][event["Medal"]]) ? acc[event["NOC"]][event["Medal"]]++: acc[event["NOC"]][event["Medal"]] = 1;
        acc[event["NOC"]]["totalMedals"]++
      } else //If not, new NOC is created with medal count set to one
        (
          acc[event["NOC"]]) = {
          [event["Medal"]]: 1,
          totalMedals: 1,
          key: event["NOC"]
        };
    }
    return acc;
  }, {})

  const topNoc = Object.values(noc).sort((a, b) => b["totalMedals"] - a["totalMedals"]).slice(0, number); //Sort NOC based on total Medals received
  const countryToRegionMap = new Map(); // Create a Map of NOC -> Region
  for (let nocMapping of nocJson) {
    countryToRegionMap.set(nocMapping["NOC"], nocMapping["region"]) //Replace each NOC with their region
  }
  let topCountries = topNoc.reduce((acc, noc) => { //top Countries based on the number provided is retrieved
    acc[countryToRegionMap.get(noc["key"])] = { // Count medals based on each Country
      "Gold": (noc['Gold']) ? noc['Gold'] : 0,
      "Bronze": (noc['Bronze']) ? noc['Bronze'] : 0,
      "Silver": (noc['Silver']) ? noc['Silver'] : 0
    }
    return acc;
  }, {})
  return topCountries
}

//M/F participation by decade 
function NumberOfParticipants(athletesJSON) {
  const currentYear = new Date().getFullYear(); // Get current Year from your computer
  const numberOfDecades = Math.ceil((currentYear - 1890) / 10); //Get number of Decades based on the current Year 
  let decadeObjArray = new Array(1).fill(undefined)
  let startDecade = 189; //Decade starting from 1890

  decadeObjArray = decadeObjArray.map(Object).map((ele) => { //Multiple buckets of different decades are created with Male and Female Keys assigned to 0
    let iteration = 0;
    while (iteration < numberOfDecades) {
      ele[startDecade] = {
        "M": new Set(),
        "F": new Set()
      }
      startDecade += 1;
      iteration++;
    }
    return ele;
  })

  let reducedJson = athletesJSON.reduce((byYear, event) => { //The Json is parsed the total number of unique male and female athletes are found
    const determiner = String(parseInt((event["Year"] / 10)))
    byYear[determiner][event["Sex"]].add(event["Name"])
    return byYear;
  }, decadeObjArray[0])

  const participantsJson = {}

  for (const year of Object.keys(reducedJson)) { //The Male and Female Sets are replaced with their lengths for count
    reducedJson[year]["M"] = reducedJson[year]["M"].size;
    reducedJson[year]["F"] = reducedJson[year]["F"].size;
    let lowerIndex = parseInt(year) * 10;
    let higherIndex = ((parseInt(year) + 1) * 10 - 1);
    let newKey = String(lowerIndex).concat('-').concat(higherIndex)

    participantsJson[newKey] = Object.assign({}, reducedJson[year]) //For each key a copy of the decade object is assigned
  }
  return participantsJson

}

// Per season average age of athletes who participated in Boxing Men's Heavyweight
function averageAgeBoxing(athletesJSON) {
  const totalCountJson = athletesJSON.reduce((countJson, event) => { //JSON is parsed to find the total Age and total number of athletes
    if (event["Event"] == "Boxing Men's Heavyweight" && (event["Age"]) != "NA") {
      if (countJson[event["Year"]]) {
        countJson[event["Year"]]["totalAge"] += parseInt(event["Age"])
        countJson[event["Year"]]["totalCount"]++;
      } else {
        countJson[event["Year"]] = {} //Empty object is created
        countJson[event["Year"]]["totalAge"] = parseInt(event["Age"])
        countJson[event["Year"]]["totalCount"] = 1;
      }
    }
    return countJson
  }, {})

  for (const year of Object.keys(totalCountJson)) { //Average is found out with the use of total age and count
    totalCountJson[year]["average"] = totalCountJson[year]["totalAge"] / totalCountJson[year]["totalCount"];
    totalCountJson[year]["average"] = totalCountJson[year]["average"].toPrecision(4) //Average is found
    delete totalCountJson[year]["totalAge"] //Total Age property is removed
    delete totalCountJson[year]["totalCount"] //Total Count property is removed 
  }
  return totalCountJson
}

//Find out all medal winners from India per season 
function medalWinners(athletesJSON) { 
  const medalJson = athletesJSON.reduce((medalCount, event) => {
    if (event["Medal"] != "NA" && event["NOC"] == "IND") { // Checks if athlete has won the medal and if he belongs from INDIA
      if (medalCount[event["Year"]]) {
        medalCount[event["Year"]].add(event["Name"]) //The Year is added with their respective names as values in the Set
      } else {
        medalCount[event["Year"]] = new Set();
        medalCount[event["Year"]].add(event["Name"])
      }
    }
    return medalCount
  }, {})
  for (const year in medalJson) {
    medalJson[year] = Array.from(medalJson[year]) //The Set is converted to an Array before sending it as JSON
  }
  return medalJson
}

module.exports = { //All the functions are exported
  NumberOfCities: NumberOfCities,
  topCountries: topCountries,
  NumberOfParticipants: NumberOfParticipants,
  averageAgeBoxing: averageAgeBoxing,
  medalWinners: medalWinners
}