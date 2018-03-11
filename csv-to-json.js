const csvToJson = require('csvtojson')
const fs = require('fs')
const path = require('path')
const eol = require('eol')

var jsonObjects = [];
var index = 0;

function writeToFile(jsonFilePath, jsonText) {
    console.log('Writing ' + jsonFilePath)
    try {
        fs.writeFileSync(jsonFilePath, jsonText)
        console.log('Done')
    }
    catch (err) {
        console.log('Error writing to ' + jsonFilePath + ', error message: ' + err.message)
    }
}

function convertCsvToJson(csvFilePath, jsonFilePath) {
    console.log('Reading ' + csvFilePath)
    csvToJson()
    .fromFile(csvFilePath)
    .on('json',(jsonObj)=>{
        if (index < 1000) {
            jsonObjects[index] = jsonObj;
            index++;
        }
    })
    .on('done',(error)=>{
        if (error) {
            console.log('Error: ' + error.message)
        } else {
            var jsonString = JSON.stringify(jsonObjects, null, 2)
            var prettyText = jsonString.replace('\r', '')
            var prettyText = eol.auto(prettyText)
            writeToFile(jsonFilePath, prettyText)
        }
    })
}

var csvFilePath = path.join(__dirname, 'customer-data.csv')
var jsonFilePath = path.join(__dirname, 'customer-data.json')
convertCsvToJson(csvFilePath, jsonFilePath)
