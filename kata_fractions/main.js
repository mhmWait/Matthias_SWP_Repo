//bruch wird so eingegeben: 1/2 ; 2/2 usw.

class Fraction {
    constructor(number) {
        this.number = number;
    }
    getTop() {
        return parseInt(this.number.split("/")[0]);
    }
    getBot() {
        return parseInt(this.number.split("/")[1]);
    }
}

function addfractions(addition) {
    const numbers = addition.split("+");
    console.log(numbers);
    let solTop = 0;
    let solBot = 0;
    const fractions = [];
    for (let i = 0; i < numbers.length; i++) {
        fractions.push(new Fraction(numbers[i]));
    }
    console.log(fractions);
    console.log(fractions.length);

    for (let i = 0; i < fractions.length; i++) {
        solBot = solBot + fractions[i].getBot();
        solTop = solTop + fractions[i].getTop();
    }
    return solTop, solBot;
}

/* function findsmallest(num) {
    input = new Fraction(num);
    let a = input.getTop();
    let b = input.getBot();

    if ((a % b) == 0 || b % a==0) {
        if (isPrim(b) || isPrim(a)) {
            return a + "/" + b;
        }
        if (a % b == 0) {
            
        }
    }


}*/

function isPrim(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

addfractions("1/2+1/4+1/3");
