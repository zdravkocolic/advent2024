import * as fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the file path: ', (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            rl.close();
            return;
        }

        const lines = data.trim().split('\n');
        const rowCount = lines.length;
        console.log('Number of rows:', rowCount);
        let goodRowsCounter = 0;

        for (let i = 0; i < rowCount; i++) {
            const row = lines[i].trim().split(/\s+/).map(Number);
            console.log('Row', i + 1, ':', row);
            let goodRows: boolean[] = [];
            let isIncreasing = true;
            let isDecreasing = true;

            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] > row[j + 1]) {
                    if (row[j] - row[j + 1] >= 1 && row[j] - row[j + 1] <= 3) {
                        goodRows.push(true);
                        isIncreasing = false;
                    } else {
                        goodRows.push(false);
                    }
                } else if (row[j] < row[j + 1]) {
                    if (row[j + 1] - row[j] >= 1 && row[j + 1] - row[j] <= 3) {
                        goodRows.push(true);
                        isDecreasing = false;
                    } else {
                        goodRows.push(false);
                    }
                } else {
                    goodRows.push(false);
                }
            }

            if (goodRows.every((val) => val === true) && (isIncreasing || isDecreasing)) {
                console.log('Row', i + 1, 'is good');
                goodRowsCounter++;
            }
        }

        console.log('Number of good rows:', goodRowsCounter);
        rl.close();
    });
});