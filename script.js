var AllValues = [];

function getInfo(form) {
    var numDice = (form.numDice.value);
    var numTimes = (form.numTimes.value);
    if (numTimes == "") {
        numTimes = 1;
    }
    console.log(numDice + " and " + numTimes);
    AllValues = [];
}

function rollDice(numDice,numTimes) {
    for (let i = 0; i < numTimes; i++) {
        var dice1 = 0;
        var dice2 = 0;
        var dice3 = 0;
        switch (numDice){
            case 3:
            dice3=random();
            case 2:
            dice2=random();
            case 1:
            dice1=random();
        }
        if (dice1 != 0) {
            AllValues.push(dice1);
        } else if (dice2 != 0) {
            AllValues.push(dice2);
        } else if (dice3 != 0) {
            AllValues.push(dice3);
        }
    }
    console.log(AllValues);
}

function data() {
    AllValues = AllValues.sort();
    const sum = AllValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
    console.log(sum);

    const mean = sum/AllValues.length;
    console.log (mean.toFixed(3));

    var median = 0;
    if (AllValues.length % 2 == 0) {
        var front = (AllValues.length-1)/2 +.5;
        var back = (AllValues.length-1)/2 -.5;
        median = (AllValues[front] + AllValues[back])/2
    } else {
        median = AllValues[(AllValues.length-1)/2];
    }
    console.log(median);

    let occur = 0;
    let value = AllValues[0];
    maxOccur = 0;
    for (let i = 0; i < AllValues.length; i++) {
        if (AllValues[i] == value) {
            occur++;
        } else {
            value = AllValues[i];
            if (occur > maxOccur) {
                maxOccur = occur;
            }
            occur = 0;
        }
    }
    console.log(maxOccur)
}

function random() {
    return Math.floor(Math.random() * (6) + 1)
}

