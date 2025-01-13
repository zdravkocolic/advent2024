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
        const list1: number[] = [];
        const list2: number[] = [];

        lines.forEach(line => {
            const [value1, value2] = line.trim().split(/\s+/).map(Number);
            list1.push(value1);
            list2.push(value2);
        });

        let distances: number[] = [];
        let distanceSum: number = 0;

        list1.sort((a, b) => a - b);
        list2.sort((a, b) => a - b);

        for (let i = 0; i < list1.length; i++) {
            distances.push(Math.abs(list1[i] - list2[i]));
        }

        for (let i = 0; i < distances.length; i++) {
            distanceSum += distances[i];
        }

        console.log('Sorted lists:', list1, list2);
        console.log('Distances:', distances);
        console.log('Distance sum:', distanceSum);
        rl.close();
    });
});