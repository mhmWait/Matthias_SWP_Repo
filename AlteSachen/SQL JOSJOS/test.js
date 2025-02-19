function fibs(num) {
    let a = 1;
    let b = 1;
    let c;
    let arr = [];
    arr.push(a, b);
    while (b <= num) {
        c = b;
        b = a + b;
        a = c;
        arr.push(b);
    }
    console.log(arr);
}

function prims(num) {
    let arrs = [];
    for (let i = 0; i <= num; i++) {
        console.log(i);
        if (isPrim(i) == true) {
            arrs.push(i);
        }
    }
    console.log(arrs[arrs.length]);
}

function isPrim(num) {
    for (let i = 1; i < Math.sqrt(num) + 1; i++) {
        if (num % i) {
            return true;
        }
    }
    return false;
}

function zusammen(num) {
    //für bis zu der 20sten prim soll es mir alle fibos geben
    console.log(fibs(prims(num)));
}
console.log(prims(20))



