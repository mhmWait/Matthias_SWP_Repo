const Roman = ["I", "V", "X", "L", "C", "D", "M"];
const Numbers = [1, 5, 10, 50, 100, 500, 1000];

const HTMLinput = "XXXIV";

function Numberise(input) {
    const newinput = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < Roman.length; j++) {
            if (input[i] === Roman[j]) {
                newinput.push(Numbers[j]);
            }
        }
    }
    console.log(newinput);
    return newinput;
}

function fromRoman(input) {
    let output = 0;
    for (let i = 0; i < input.length - 1; i++) {
        if (input[i] > input[i + 1]) {
            output += input[i];
        }
        if (input[i] < input[i + 1]) {
            output -= input[i];
        }
        if (input[i] === input[i + 1]) {
            output += input[i];
        }
    }
    output += input[input.length - 1];
    console.log(output);
}

function toRoman(input) {
    
}

fromRoman(Numberise(HTMLinput));
