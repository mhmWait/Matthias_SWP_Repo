const romans = require("romans");

function Romanise(input) {
    return romans.deromanize(input);
}

function Numberise(input) {
    return romans.romanize(parseInt(input));
}

function main() {
    console.log(Romanise("DCCCXXI"));
    console.log(Numberise("621"));
}
main();
