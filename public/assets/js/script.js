const lancerDe = function () {
    const numberDecimal = (Math.random() * 6) + 1
    const number = Math.trunc(numberDecimal)
    return number
};

const roollDice = lancerDe()

function rollDices() {
    let result = [];
    for (let index = 0; index < 5; index++) {
        result.push(roollDice);
        if ((roollDice * 4) === (roollDice * 4)) {
            console.log('carré')
            break
        } else if ((roollDice * 5) === (roollDice * 5)) {
            console.log('yams')
        }
    }
    return result;
}
console.log(rollDices());