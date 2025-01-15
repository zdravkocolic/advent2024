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
        var list1 = [];
        var list2 = [];
        lines.forEach(function (line) {
            var _a = line.trim().split(/\s+/).map(Number), value1 = _a[0], value2 = _a[1];
            list1.push(value1);
            list2.push(value2);
        });
        var distances = [];
        var similarity = [];
        var similaritySum = 0;
        var distanceSum = 0;
        list1.sort(function (a, b) { return a - b; });
        list2.sort(function (a, b) { return a - b; });
        for (var i = 0; i < list1.length; i++) {
            distances.push(Math.abs(list1[i] - list2[i]));
        }
        for (var i = 0; i < distances.length; i++) {
            distanceSum += distances[i];
        }
        var list2CountMap = new Map();
        list2.forEach(function (value) {
            list2CountMap.set(value, (list2CountMap.get(value) || 0) + 1);
            console.log('List2:', list2CountMap);
        });
        list1.forEach(function (value) {
            if (list2CountMap.has(value)) {
                similaritySum += value * list2CountMap.get(value);
            }
        });
        console.log('Distances:', distances);
        console.log('Distance sum:', distanceSum);
        console.log('Similarity sum:', similaritySum);
        rl.close();
    });
});
