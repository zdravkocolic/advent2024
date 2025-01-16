"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var evaluate_row_1 = require("./evaluate_row");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Enter the file path: ', function (filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            console.error('Error reading file:', err);
            rl.close();
            return;
        }
        var lines = data.trim().split('\n');
        var rows = lines.map(function (line) { return line.trim().split(/\s+/).map(Number); });
        console.log('Number of rows:', rows.length);
        (0, evaluate_row_1.processRows)(rows);
        rl.close();
    });
});
