// Import statements
let csvToJsonFunc = require('../src/csvtojson.js');
let Olympics = require('../src/olympics.js')
let numberOfCitiesFunc = Olympics.NumberOfCities;
let athlete_events_json = require('./sample_json.js')

describe("Olympics Project Tests", () => {
  describe("Number of times Olympics was hosted per city over the years", ()=>{ 
    test("Should be defined", ()=> {
        expect(numberOfCitiesFunc).toBeDefined();
    })
    test("Should be an Object", () => {
      expect(typeof numberOfCitiesFunc(athlete_events_json.athlete_json)).toEqual("object")

    })
    test("Expected Output", () => {
      expect(numberOfCitiesFunc(athlete_events_json.athlete_json)).toEqual(athlete_events_json.expected_output)
    })
  })
})
