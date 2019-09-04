// Import statements
let csvToJsonFunc = require('../src/csvtojson.js');
let Olympics = require('../src/olympics.js')
let athlete_events_json = require('./sample_json.js')
let athlete_events_json_top = require('./sample_json_top10.js')
let athlete_events_json_participants = require('./sample_json_participants.js')
let numberOfCitiesFunc = Olympics.NumberOfCities;
let topCountries = Olympics.topCountries;
let numberOfParticipants = Olympics.NumberOfParticipants

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
  describe("Top 3 countries who have won most medals after 2000 - split gold/silver/bronze", ()=>{ 
    test("Should be defined", ()=> {
        expect(topCountries).toBeDefined();
    })
    test("Should be an Object", () => {
      expect(typeof topCountries(athlete_events_json_top.athlete_json,athlete_events_json_top.noc_json,3)).toEqual("object")

    })
    test("Expected Output", () => {
      expect(topCountries(athlete_events_json_top.athlete_json,athlete_events_json_top.noc_json,3)).toEqual(athlete_events_json_top.expected_output)
    })
  })
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
