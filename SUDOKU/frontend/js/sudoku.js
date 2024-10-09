const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
class Sudoku {
    #recursion_depth;
    _maxSolutions;
    _data;
    _foundSolutions;
    constructor({ data, recursionDepth, state }) {
        this.grid = new Grid(data);
        this.recursionDepth = recursionDepth;
        this.state = state;
    }

    // ich verstehe nicht wo das sudoku im frontend aufgerufen wird also wo in der script datei jemals das sudoku erstellt wird.
    // wenn ich das sudoku versuche zu importieren um halt es aufzurufen dann geht nix mehr
    //hab jetzt mal die logischen funktionen geschreiben mit einem array welche das grid dummyweise liefert aber ja

    dictionaryToSudokuArray(dictionary) {
        const colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        const rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

        for (const key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                const row = colNames.indexOf(key[0]);
                const col = rowNames.indexOf(key[1]);
                grid[row][col] = dictionary[key];
            }
        }
        console.log(grid);
        console.log("point 2");
        this.solveSudoku(grid);
        console.log("point 3");
        return;
    }

    solveObvious(grid) {
        let changed = true;
        console.log("point 1");
        while (changed) {
            changed = false;

            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (grid[row][col] === 0) {
                        const possibleValues = this.getPossibleValues(
                            grid,
                            row,
                            col
                        );
                        if (possibleValues.length === 1) {
                            grid[row][col] = possibleValues[0];
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    getPossibleValues(grid, row, col) {
        const possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let i = 0; i < 9; i++) {
            possibleValues.delete(grid[row][i]);
            possibleValues.delete(grid[i][col]);
        }
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                possibleValues.delete(grid[boxRow + r][boxCol + c]);
            }
        }
        return Array.from(possibleValues);
    }

    solveSudoku(ImGrid) {
        const grid = ImGrid;

        this.solveObvious(grid);

        const emptyCell = this.findEmptyCell(grid);
        if (!emptyCell) {
            const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
            console.log("dadadadadadadadadad");
            console.log(grid);
            console.log("dadadadadadadadadad");
            for (let row in rows) {
                for (let k = 0; k < 9; k++) {
                    if (grid[row][k] !== 0) {
                        let a = rows[row] + k + 1;
                        this.grid.data[a] = grid[row][k];
                        console.log(this.grid.data);
                    }
                }
            }

            return true;
        }

        const [row, col] = emptyCell;
        const possibleValues = this.getPossibleValues(grid, row, col);

        for (const value of possibleValues) {
            grid[row][col] = value;
            if (this.solveSudoku(grid)) {
                return true;
            }
            grid[row][col] = 0;
            this.#recursion_depth++;
        }
        console.log("keine lösung");
        return false;
    }

    findEmptyCell(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        console.log("grid is leer");
        return null;
    }

    printGrid(grid) {
        console.log(grid.map((row) => row.join(" ")).join("\n"));
    }

    renderInto(domNode) {
        Array.from(domNode.querySelectorAll(".grid-item")).forEach(
            (e) => (e.innerHTML = "")
        );
        console.log("logiinggadada");
        console.log(this.dictionaryToSudokuArray(this.grid.data));
        for (let pos in this.grid.data) {
            domNode.querySelector(`#${pos}`).innerText = this.grid.data[pos];
        }
    }
}
class Cell {
    constructor(position, value, recursionDepth, isAssumption) {
        this.position = position; // zb "a1"
        this.value = value; // zb 9
        this.recursionDepth = recursionDepth; // beginnend mit 0
        this.isAssumption = isAssumption;
    }
}
class Grid {
    colNames = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    rowNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    constructor(obj) {
        const data = {};
        Object.assign(data, obj);
        this.data = data;
        if (!this.isValid()) {
            throw new Error("Invalid grid");
        }
    }

    setCell(position, value) {
        if (!value instanceof Cell) {
            throw new Error("Value must be an instance of Cell");
        }
        this.data[position] = value;
    }
    allEmptyCellNames() {
        // TODO #8
    }
    isFull() {
        return this.allEmptyCellNames().length === 0;
    }
    cellCount() {
        return Object.keys(this.data).length;
    }

    isValidRows() {
        for (let rowName of rowNames) {
            if (this.isValidRow(rowName) === false) return false;
        }
        return true;
    }
    isValidRow(rowName) {
        const set = new Set();
        for (let colName of colNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;

            if (set.has(this.data[cell])) return false;
            set.add(this.data[cell]);
        }
        return true;
    }

    isValidCols() {
        for (let colName of colNames) {
            if (this.isValidCol(colName) == false) return false;
        }
        return true;
    }
    isValidCol(colName) {
        const set = new Set();
        for (let rowName of rowNames) {
            const cell = colName + rowName;
            if (this.data[cell] == undefined) continue;
            if (set.has(this.data[cell])) {
                return false;
            }
            set.add(this.data[cell]);
        }
        return true;
    }

    isValidSquares() {
        for (let i = 1; i <= 9; i++) {
            if (this.isValidSquare(i) === false) return false;
        }
        return true;
    }

    isValidSquare(num) {
        const keys = getSubGridKeys(num);
        for (let i = 0; i < keys.length; i++) {
            const set = new Set();
            for (let j = 0; j < keys.length; j++) {
                const cell = keys[j];
                if (this.data[cell] == undefined) continue;
                if (set.has(this.data[cell])) return false;
                set.add(this.data[cell]);
            }
        }
        return true;
    }
    getSubGridKeys(num) {
        const col = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
        const row = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        num = num - 1;
        let firstColIndex = (num % 3) * 3;
        let firstRowIndex = Math.floor(num / 3) * 3;
        let keys = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                keys.push(col[firstColIndex + j] + row[firstRowIndex + i]);
            }
        }

        return keys;
    }

    isValid() {
        if (this.isValidRows() === false) {
            return false;
        }
        if (this.isValidCols() === false) {
            return false;
        }
        if (this.isValidSquares() === false) {
            return false;
        }

        return true;
    }
}
const myExports = { Sudoku, Cell, colNames, rowNames, Grid };
if (typeof window != "undefined") {
    // browser
    Object.assign(window, myExports);
} else {
    // node
    module.exports = myExports;
}
