/*
1) Number of times olympics hosted per city over the years - Piechart
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
        
    // for (let key in cityCountObj) {
    //     let oneViz = {}
    //     oneViz["name"] = key;
    //     oneViz["y"] = (cityCountObj[key]/totalCount)*100;
    //     cityCountViz.push(oneViz);
    // }
    // return cityCountViz;

    return cityCountObj
}

module.exports = {
    NumberOfCities : NumberOfCities
     
}