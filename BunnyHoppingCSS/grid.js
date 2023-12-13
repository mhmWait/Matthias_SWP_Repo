var bunny = document.querySelector("#bunny");
var root = document.querySelector("#root");

function abc() {
    const avs = setInterval(function () {
        bunny.style.gridColumnStart = Math.round(Math.random() * (7 - 1) + 1);
        bunny.style.gridRowStart = Math.round(Math.random() * (7 - 1) + 1);
        alert("ALARM!!!");
    }, 1);

    let colors = ["red", "yellow", "blue", "green", "orange"];

    setInterval(() => {
        document.body.style.setProperty(
            "--bgColor",
            colors[Math.floor(Math.random() * 5)]
        );
    }, 1);
}Test
