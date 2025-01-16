"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateRow = evaluateRow;
exports.processRows = processRows;
function evaluateRow(row) {
    var goodRows = [];
    var isIncreasing = true;
    var isDecreasing = true;
    for (var j = 0; j < row.length - 1; j++) {
        var diff = row[j + 1] - row[j];
        if (diff > 0) {
            if (diff >= 1 && diff <= 3) {
                goodRows.push(true);
                isDecreasing = false; // Niz nije opadajući
            }
            else {
                goodRows.push(false);
            }
        }
        else if (diff < 0) {
            if (Math.abs(diff) >= 1 && Math.abs(diff) <= 3) {
                goodRows.push(true);
                isIncreasing = false; // Niz nije rastući
            }
            else {
                goodRows.push(false);
            }
        }
        else {
            goodRows.push(false); // Razlika je 0, ovo nije validno
        }
    }
    return { goodRows: goodRows, isIncreasing: isIncreasing, isDecreasing: isDecreasing };
}
function processRows(rows) {
    var goodRowsCounter = 0;
    rows.forEach(function (row, i) {
        var _a = evaluateRow(row), goodRows = _a.goodRows, isIncreasing = _a.isIncreasing, isDecreasing = _a.isDecreasing;
        if (goodRows.every(function (val) { return val === true; }) && (isIncreasing || isDecreasing)) {
            console.log('Row', i + 1, 'is good');
            goodRowsCounter++;
        }
        else {
            var fixed = false;
            for (var j = 0; j < row.length; j++) {
                // Kreiraj kopiju niza bez trenutnog elementa
                var row2 = row.slice();
                row2.splice(j, 1);
                console.log('Trying to remove element', row[j], 'from row', i + 1);
                // Proveri novi niz
                var _b = evaluateRow(row2), newGoodRows = _b.goodRows, newIsIncreasing = _b.isIncreasing, newIsDecreasing = _b.isDecreasing;
                if (newGoodRows.every(function (val) { return val === true; }) && (newIsIncreasing || newIsDecreasing)) {
                    console.log('Row', i + 1, 'is good after removing element', row[j]);
                    console.log('New row:', row2);
                    goodRowsCounter++;
                    fixed = true;
                    break; // Prekida petlju čim pronađe rešenje
                }
            }
            if (!fixed) {
                console.log('Row', i + 1, 'is bad');
            }
        }
    });
    console.log('Total number of good rows:', goodRowsCounter);
}
