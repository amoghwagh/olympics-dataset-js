// Import statements
let csvToJsonFunc = require('../src/csvtojson.js');
let Olympics = require('../src/olympics.js')
let athlete_events_json = require('./sample_json_top10.js')
let topCountries = Olympics.topCountries;

describe("Olympics Project Tests", () => {
  describe("Number of times Olympics was hosted per city over the years", ()=>{ 
    test("Should be defined", ()=> {
        expect(topCountries).toBeDefined();
    })
    test("Should be an Object", () => {
      expect(typeof topCountries(athlete_events_json.athlete_json,athlete_events_json.noc_json,3)).toEqual("object")

    })
    test("Expected Output", () => {
      expect(topCountries(athlete_events_json.athlete_json,athlete_events_json.noc_json,3)).toEqual(athlete_events_json.expected_output)
    })
  })
})
