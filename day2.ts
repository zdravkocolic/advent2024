import * as fs from 'fs';
import * as readline from 'readline';
import { evaluateRow, processRows } from './evaluate_row';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter the file path: ', (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            rl.close();
            return;
        }

        const lines = data.trim().split('\n');
        const rows = lines.map((line) => line.trim().split(/\s+/).map(Number));

        console.log('Number of rows:', rows.length);

        processRows(rows);

        rl.close();
    });
});
