const romans = require("romans");

inputRoman = document.getElementById("inputRoman");
inputNumber = document.getElementById("inputNumber");
outputRoman = document.getElementById("outputRoman");
outputNumber = document.getElementById("outputNumber");

function Numberise() {
    outputRoman = romans.deromanize(inputRoman.value);
}

function Romanise() {
    outputNumber.value = romans.romanize(inputNumber.value);
}
