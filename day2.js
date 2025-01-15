"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Enter the file path: ', function (filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err);
            rl.close();
            return;
        }
        var lines = data.trim().split('\n');
        var rowCount = lines.length;
        console.log('Number of rows:', rowCount);
        var goodRowsCounter = 0;
        for (var i = 0; i < rowCount; i++) {
            var row = lines[i].trim().split(/\s+/).map(Number);
            console.log('Row', i + 1, ':', row);
            var goodRows = [];
            var isIncreasing = true;
            var isDecreasing = true;
            for (var j = 0; j < row.length - 1; j++) {
                if (row[j] > row[j + 1]) {
                    if (row[j] - row[j + 1] >= 1 && row[j] - row[j + 1] <= 3) {
                        goodRows.push(true);
                        isIncreasing = false;
                    }
                    else {
                        goodRows.push(false);
                    }
                }
                else if (row[j] < row[j + 1]) {
                    if (row[j + 1] - row[j] >= 1 && row[j + 1] - row[j] <= 3) {
                        goodRows.push(true);
                        isDecreasing = false;
                    }
                    else {
                        goodRows.push(false);
                    }
                }
                else {
                    goodRows.push(false);
                }
            }
            // Check if all values in goodRows are true and the row is either entirely increasing or decreasing
            if (goodRows.every(function (val) { return val === true; }) && (isIncreasing || isDecreasing)) {
                console.log('Row', i + 1, 'is good');
                goodRowsCounter++;
            }
        }
        console.log('Number of good rows:', goodRowsCounter);
        rl.close();
    });
});
