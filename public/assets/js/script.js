const lancerDe = function () {
    const numberDecimal = (Math.random() * 6) + 1
    const number = Math.trunc(numberDecimal)
    return number
};


const result = lancerDe()

console.log(result)

function lancerDes() {
    let result = [];
    for (let index = 0; index < 5; index++) {
        result.push(result);
    }
    return result;

}
let diceResult = lancerDes();
console.log(diceResult);