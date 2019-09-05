fetch('./data.json') //Data is fetched from data.json File
    .then(r => r.json())
    .then(data => {
        createTable(data["medalWinners"])
    })

function createTable(medalWinnersJson) { //A table is created and rows are dynamically alloted based on the number of years present
    let table = document.getElementById("medalTable");
    let yearKeys = Object.keys(medalWinnersJson)
    let rowCount = 0;
    for(let year in medalWinnersJson) {
        let row = table.insertRow(rowCount+1) // New Row is created
        let yearCell = row.insertCell(0) //New cell is created at position 0
        let nameCell = row.insertCell(1) //New cell is created at position 1

        yearCell.innerHTML = yearKeys[rowCount++] //Year is added at position 0
        nameCell.innerHTML = medalWinnersJson[year] //Winner's name is added at position 1
    }
}