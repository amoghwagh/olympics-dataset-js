fetch('./data.json')
    .then(r => r.json())
    .then(data => {
        createTable(data["medalWinners"])
    })

function createTable(medalWinnersJson) {
    let table = document.getElementById("medalTable");
    let yearKeys = Object.keys(medalWinnersJson)
    let rowCount = 0;
    for(let year in medalWinnersJson) {
        let row = table.insertRow(rowCount+1)
        let yearCell = row.insertCell(0)
        let nameCell = row.insertCell(1)

        yearCell.innerHTML = yearKeys[rowCount++]
        nameCell.innerHTML = medalWinnersJson[year]
    }
}