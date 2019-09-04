
// Import statements
let csvToJsonFunc = require('../src/csvtojson.js');
let Olympics = require('../src/olympics.js')
let athlete_events_json_participants = require('./sample_json_participants.js')
let numberOfCitiesFunc = Olympics.NumberOfCities;
let topCountries = Olympics.topCountries;
let numberOfParticipants = Olympics.NumberOfParticipants

describe("Olympics Project Tests", () => {
  describe("Male and Female Participation by Decade", ()=>{ 
    test("Should be defined", ()=> {
        expect(numberOfParticipants).toBeDefined();
    })
    test("Should be an Object", () => {
      expect(typeof numberOfParticipants(athlete_events_json_participants.athlete_json)).toEqual("object")

    })
    test("Expected Output", () => {
      expect(numberOfParticipants(athlete_events_json_participants.athlete_json,)).toEqual(athlete_events_json_participants.expected_output)
    })
  })
  
})

