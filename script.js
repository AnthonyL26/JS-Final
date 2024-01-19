var AllValues = [];
var doubles = 0;
var triplets = 0;
var sums = [];

// Function tied to the button that will set the user inputted information into variables.
function getInfo(form) {
    var numDice = (form.numDice.value);
    var numTimes = (form.numTimes.value);
    if (numTimes == "") {
        numTimes = 1;
    }
    AllValues = [];
    doubles = 0;
    triplets = 0;
    rollDice(parseInt(numDice), parseInt(numTimes));
}

//Will roll the dice according to user input
function rollDice(numDice,numTimes) {
    sums = [];
    for (let i = 0; i < numTimes; i++) {
        var dice1 = 0;
        var dice2 = 0;
        var dice3 = 0;
        switch (numDice){
            case 3:
            dice3=random();
            dice2=random();
            dice1=random();
            if (dice1==dice2 && dice3 == dice2) {
                triplets++;
            }
            case 2:
            dice2=random();
            dice1=random();
            if(dice1 == dice2) {
                doubles++;
            }
            case 1:
            dice1=random();
            break;
        }
        if (dice1 != 0) {
            AllValues.push(dice1);
        } if (dice2 != 0) {
            AllValues.push(dice2);
        } if (dice3 != 0) {
            AllValues.push(dice3);
        }
        sums.push(dice1+dice2+dice3);
    }
    
    console.log(AllValues);
    data(numDice);
}

//Does all calculations for the data that is represented in the table.
function data(numDice) {
    sums = sums.sort();
    const sum = sums.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );

    const mean = sum/sums.length;
    console.log (mean.toFixed(2));

    var median = 0;
    if (sums.length % 2 == 0) {
        var front = (sums.length)/2;
        var back = (sums.length)/2-1;
        median = (sums[front] + sums[back])/2
    } else {
        median = sums[(sums.length-1)/2];
    }
    console.log(median);

    let occurences = count(sums);
    var mode = [];
    var max = 0
    for (let i = 1; i <=18; i++) {
        if (occurences[i] > max) {
            max = occurences[i];
        }
    }
    for (let i = 1; i <=18; i++) {
        if (occurences[i] == max) {
            mode.push(i);
        }
    }
    console.log(mode);

    let frequencies = count(sums);
    console.log(frequencies);
    update(frequencies, mean, median, mode, numDice);
}

//https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements 
function count(arr) {
    return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
}
  
function random() {
    return Math.floor(Math.random() * (6) + 1)
}

//Updates the webpage with a new row in the table with the required data.
function update(frequencies, mean, median, mode, numDice) {
    console.log(frequencies[1]);
    const table = document.querySelector('table');
    const tblBody = document.createElement('tbody');
    var cellText = '';
    const row = document.createElement('tr');

    for (let i = 0; i < 3; i++) {
        const cell = document.createElement('td');
        switch (i) {
            case 0:
                outcomes = 0;
                start = 0;
                if (numDice == 1) {
                    outcomes = 6;
                    start = 1;
                } else if (numDice == 2) {
                    outcomes = 12;
                    start = 2;
                } else if (numDice == 3) {
                    outcomes = 18
                    start= 3;
                } 
                var text = ``;
                for (let i = start; i <=outcomes; i++ ) {
                    if (frequencies[i] == undefined) {
                        frequencies[i] = 0;
                    }
                    text+= `${i}:${frequencies[i]} `
                }
                cellText = document.createTextNode(text);
                break;
            case 1: 
                cellText = document.createTextNode(`Mean: ${mean}\nMedian: ${median}\nMode: ${mode}`);
                break;
            case 2:
                cellText = document.createTextNode(`Doubles: ${doubles}\nTriplets: ${triplets}`);
                break;
        }

        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    table.appendChild(tblBody);
}

