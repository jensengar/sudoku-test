process.stdin.resume();
process.stdin.setEncoding('utf8');

let allNumbers = [];

process.stdin.resume();
process.stdin.on('data', function (data) {
  const numbers = data.split(/\s/)[0].split(',');

  numbers.forEach(n => {
    if (n) {
      allNumbers.push(n);
    }
  });
})
process.stdin.on('end', function () {
  processAllNumbers();
});

const gridWidth = 9;
const sectionWidth = 3;

function processAllNumbers () {
  const rows = [];
  
  for (let i = 0; i < allNumbers.length; i++) {
    const rowIndex = Math.floor(i / gridWidth);

    if (rowIndex >= rows.length) {
      rows.push([]);
    }

    rows[rowIndex].push(allNumbers[i]);
  }

  // validate rows
  rows.forEach(row => {
    const valueSet = new Set();

    row.forEach(num => valueSet.add(num));
    validateValueSet(valueSet);
  });

  // validate columns
  for (let i = 0; i < gridWidth; i++) {
    const valueSet = new Set();
    rows.forEach(row => valueSet.add(row[i]));
    
    validateValueSet(valueSet);
  }

  // validate sections
  for (let i = 0; i < gridWidth; i++) {
    const valueSet = getSectionValueSet(i, rows);

    validateValueSet(valueSet);    
  }

  process.stdout.write('True');
}

function getSectionValueSet (sectionNum, rows) {
  const startingRow = Math.floor(sectionNum / sectionWidth) * sectionWidth;
  const startingCol = sectionNum % sectionWidth * sectionWidth;

  const valueSet = new Set();
  const section = [];
  for (let i = 0; i < sectionWidth; i++) {
    const rowIndex = i + startingRow;

    for (let j = 0; j < sectionWidth; j++) {
      const colIndex = j + startingCol;
      
      valueSet.add(rows[rowIndex][colIndex]);
      section.push(rows[rowIndex][colIndex]);
    }
  }

  return valueSet;
}

function validateValueSet (valueSet) {
  if (valueSet.size < gridWidth) {
    process.stdout.write('False');
    process.exit();
  }
}