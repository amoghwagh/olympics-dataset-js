// Import statements
let csvToJsonFunc = require('../src/csvtojson.js');
let Olympics = require('../src/olympics.js')
let athlete_events_json_top10 = require('./sample_json_top10.js')
let topTenCountries = Olympics.topTenCountries;

describe("Olympics Project Tests", () => {
  describe("Number of times Olympics was hosted per city over the years", ()=>{ 
    test("Should be defined", ()=> {
        expect(topTenCountries).toBeDefined();
    })
    test("Should be an Object", () => {
      expect(typeof topTenCountries(athlete_events_json_top10.athlete_json,athlete_events_json_top10.noc_json,3)).toEqual("object")

    })
    test("Expected Output", () => {
      expect(topTenCountries(athlete_events_json_top10.athlete_json,athlete_events_json_top10.noc_json,3)).toEqual(athlete_events_json_top10.expected_output)
    })
  })
})
