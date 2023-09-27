var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

wann = 0;

function hoop(row, column) {
    bunny.style.gridRowStart = row;
    bunny.style.gridColumnStart = column;
}
function abc() {
    for (i = 1; i < 8; i++) {
        wann += 1000;

        for (k = 1; k < 8; k++) {
            wann += 1000;
            setTimeout(hoop(i, k), wann);
        }
    }
}
