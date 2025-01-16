export function evaluateRow(row: number[]): { goodRows: boolean[], isIncreasing: boolean, isDecreasing: boolean } {
    let goodRows: boolean[] = [];
    let isIncreasing = true;
    let isDecreasing = true;

    for (let j = 0; j < row.length - 1; j++) {
        const diff = row[j + 1] - row[j];

        if (diff > 0) {
            if (diff >= 1 && diff <= 3) {
                goodRows.push(true);
                isDecreasing = false; // Niz nije opadajući
            } else {
                goodRows.push(false);
            }
        } else if (diff < 0) {
            if (Math.abs(diff) >= 1 && Math.abs(diff) <= 3) {
                goodRows.push(true);
                isIncreasing = false; // Niz nije rastući
            } else {
                goodRows.push(false);
            }
        } else {
            goodRows.push(false); // Razlika je 0, ovo nije validno
        }
    }

    return { goodRows, isIncreasing, isDecreasing };
}


export function processRows(rows: number[][]) {
    let goodRowsCounter = 0;

    rows.forEach((row, i) => {
        const { goodRows, isIncreasing, isDecreasing } = evaluateRow(row);

        if (goodRows.every((val) => val === true) && (isIncreasing || isDecreasing)) {
            console.log('Row', i + 1, 'is good');
            goodRowsCounter++;
        } else {
            let fixed = false;

            for (let j = 0; j < row.length; j++) {
                let row2 = row.slice();
                row2.splice(j, 1);
                console.log('Trying to remove element', row[j], 'from row', i + 1);

                // Proveri novi niz
                const { goodRows: newGoodRows, isIncreasing: newIsIncreasing, isDecreasing: newIsDecreasing } = evaluateRow(row2);

                if (newGoodRows.every((val) => val === true) && (newIsIncreasing || newIsDecreasing)) {
                    console.log('Row', i + 1, 'is good after removing element', row[j]);
                    console.log('New row:', row2);
                    goodRowsCounter++;
                    fixed = true;
                    break;
                }
            }

            if (!fixed) {
                console.log('Row', i + 1, 'is bad');
            }
        }
    });

    console.log('Total number of good rows:', goodRowsCounter);
}


