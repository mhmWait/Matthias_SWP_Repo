// paar tests gemacht um halt logic zu überprüfen

function solveObvious(grid) {
    let changed = true;

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

function getPossibleValues(grid, row, col) {
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

function solveSudoku(grid) {
    this.solveObvious(grid);

    const emptyCell = this.findEmptyCell(grid);
    if (!emptyCell) {
        console.log("Solved Sudoku:");
        this.printGrid(grid);
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
    }
    console.log("keine lösung");
    return false;
}

function findEmptyCell(grid) {
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

function printGrid(grid) {
    console.log(grid.map((row) => row.join(" ")).join("\n"));
}

const testGrid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

solveSudoku(testGrid);
