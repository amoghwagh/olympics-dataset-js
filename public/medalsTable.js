function createTable(medalWinnersJson) { // A table is created and rows are dynamically alloted based on the number of years present
  const table = document.getElementById('medalTable');
  const yearKeys = Object.keys(medalWinnersJson);
  console.log(yearKeys)
  let rowCount = 0;
  for (const year of Object.keys(medalWinnersJson)) {
    const row = table.insertRow(rowCount+1); // New Row is created
    const yearCell = row.insertCell(0); // New cell is created at position 0
    const nameCell = row.insertCell(1); // New cell is created at position 1

    yearCell.innerHTML = yearKeys[rowCount]; //  Year is added at position 0 of the row
    nameCell.innerHTML = medalWinnersJson[year]; //  Winner's name is added at position 1 of the row
    rowCount += 1;
  }
}

fetch('./data.json') // Data is fetched from data.json File
  .then(r => r.json())
  .then((data) => {
    createTable(data.medalWinners);
  });
