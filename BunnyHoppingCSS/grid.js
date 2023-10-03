var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

function abc() {
    a = 1;
    b = 1;
    const avs = setInterval(function () {
        a++;
        console.log(a % 7);
        if (a % 7 != 0) {
            bunny.style.gridColumnStart = a % 7;
        }
        if (a % 7 == 0) {
            b++;
            bunny.style.gridColumnStart = 1;
        }
        if (b == 8 && a % 7 == 6) {
            clearInterval(avs);
        }
        bunny.style.gridRowStart = b;
    }, 200);
}
