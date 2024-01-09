function rollDice(form) {
    var numDice = (form.numDice.value);
    var numTimes = (form.numTimes.value);
    if (numTimes == "") {
        numTimes = 1;
    }
    console.log(numDice + " and " + numTimes);
}