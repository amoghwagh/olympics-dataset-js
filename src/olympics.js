/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/*
1) Number of times olympics hosted per city over the NOCs - Piechart
2) Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
3) M/F participation by decade - column chart
4) Per season average age of athletes who participated in Boxing Men's Heavyweight - Line
5) Find out all medal winners from India per season - Table
*/
// Import statements
const utils = require('./utils.js');

const { myObjectMap } = utils;

// Number of times olympics hosted per city over the NOCs - Piechart
function numberOfCities(athletesJSON) {
  const gamesSet = new Set(); // New Set is Defined for Each Game
  const cityCountObj = athletesJSON.reduce((acc, event) => {
    // Counts the number of times olympics was held in each city
    if (!gamesSet.has(event.Games)) {
      gamesSet.add(event.Games);
      if (acc[event.City]) {
        acc[event.City] += 1;
      } else {
        acc[event.City] = 1; // Count for Each City is increased based on Games Set
      }
    }
    return acc;
  }, {});

  return cityCountObj;
}

// Top 10 countries who have won most medals after 2000 - stacked column - split gold/silver/bronze
function topCountries(eventsJson, nocJson, number) {
  const noc = eventsJson.reduce((acc, event) => {
    if (event.Year > 2000 && event.Medal !== 'NA') {
      //  Checks if year>2000 and if the athlete has won a medal
      if (acc[event.NOC]) {
        // If NOC is present then medal count is increased based on the type of medal won
        if (acc[event.NOC][event.Medal]) {
          acc[event.NOC][event.Medal] += 1;
        } else {
          acc[event.NOC][event.Medal] = 1;
        }
        acc[event.NOC].totalMedals += 1;
      } else {
        // If not, new NOC is created with medal count set to one
        acc[event.NOC] = {
          [event.Medal]: 1,
          totalMedals: 1,
          key: event.NOC
        };
      }
    }
    return acc;
  }, {});

  const topNoc = Object.values(noc)
    .sort((a, b) => b.totalMedals - a.totalMedals)
    .slice(0, number); //  Sort NOC based on total Medals received
  const countryToRegionMap = new Map(); // Create a Map of NOC -> Region
  for (const nocMapping of nocJson) {
    countryToRegionMap.set(nocMapping.NOC, nocMapping.region); //  Replace each NOC with their region
  }
  const topCountriesJson = topNoc.reduce((acc, noc) => {
    // top Countries based on the number provided is retrieved
    acc[countryToRegionMap.get(noc.key)] = {
      // Count medals based on each Country
      Gold: noc.Gold ? noc.Gold : 0,
      Bronze: noc.Bronze ? noc.Bronze : 0,
      Silver: noc.Silver ? noc.Silver : 0
    };
    return acc;
  }, {});
  return topCountriesJson;
}

const { convertToDecade } = utils;
//  M/F participation by decade
function numberOfParticipants(athletesJSON) {
  const decadeJson = athletesJSON.reduce((byYear, event) => {
    // The Json is parsed the total number of unique male and female athletes are found
    const decade = convertToDecade(String(parseInt(event.Year / 10, 10))); // Takes first 3 digits

    if (byYear[decade]) {
      byYear[decade][event.Sex].add(event.Name); // Adds name to the decade
    } else {
      byYear[decade] = {};
      byYear[decade].M = new Set();
      byYear[decade].F = new Set();
      byYear[decade][event.Sex].add(event.Name); // Adds name to the decade
    }
    return byYear;
  }, {});

  const finalDecadeJson = myObjectMap(decadeJson, eachDecade => {
    const decadeObj = myObjectMap(eachDecade, eachSet => {
      const setSizeObj = eachSet.size;
      return setSizeObj;
    });
    return decadeObj;
  });

  return finalDecadeJson;
}

// Per season average age of athletes who participated in Boxing Men's Heavyweight
function averageAgeBoxing(athletesJSON) {
  const totalCountJson = athletesJSON.reduce((countJson, event) => {
    // JSON is parsed to find the total Age and total number of athletes
    if (event.Event === "Boxing Men's Heavyweight" && event.Age !== 'NA') {
      if (countJson[event.Year]) {
        countJson[event.Year].totalAge += parseInt(event.Age, 10);
        countJson[event.Year].totalCount += 1;
      } else {
        countJson[event.Year] = {}; //  Empty object is created
        countJson[event.Year].totalAge = parseInt(event.Age, 10);
        countJson[event.Year].totalCount = 1;
      }
    }
    return countJson;
  }, {});

  const averageJson = myObjectMap(totalCountJson, eachYear => {
    const yearJson = {};
    yearJson.average = (eachYear.totalAge / eachYear.totalCount).toPrecision(4); //  Average is found out with the use of total age and count
    return yearJson;
  });
  return averageJson;
}

//  Find out all medal winners from India per season
function medalWinners(athletesJSON) {
  const medalJson = athletesJSON.reduce((medalCount, event) => {
    if (event.Medal !== 'NA' && event.NOC === 'IND') {
      // Checks if athlete has won the medal and if he belongs from INDIA
      if (medalCount[event.Year]) {
        medalCount[event.Year].add(event.Name); // The Year is added with their respective names as values in the Set
      } else {
        medalCount[event.Year] = new Set();
        medalCount[event.Year].add(event.Name);
      }
    }
    return medalCount;
  }, {});

  const medalWinnersJson = myObjectMap(medalJson, year => Array.from(year)); //  The Set is converted to an Array before sending it as JSON
  return medalWinnersJson;
}

module.exports = {
  // All the functions are exported
  numberOfCities,
  topCountries,
  numberOfParticipants,
  averageAgeBoxing,
  medalWinners
};
