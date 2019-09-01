
function csvToJson(csvFilePath) {      //Converts CSV to JSON
    const csv = require('csvtojson')
    return new Promise( (resolve,reject) => {
    csv().fromFile(csvFilePath)
    .then((jsonObj)=>{
        resolve(jsonObj)
    })
    .error((err) => {
        reject(err)
    })
})
}

module.exports = csvToJson;     //Module is Exported 
