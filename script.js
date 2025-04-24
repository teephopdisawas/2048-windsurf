const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.getElementById('score');
const newGameButton = document.getElementById('new-game-button');

let grid = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
let score = 0;

function startGame() {
    grid = [[0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]];
    score = 0;
    addNumber();
    addNumber();
    updateGrid();
    updateScore();
}

function addNumber() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({x: i, y: j});
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateGrid() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            cell.textContent = grid[i][j] === 0 ? '' : grid[i][j];
            cell.className = 'grid-cell';
            if (grid[i][j] !== 0) {
                cell.classList.add(`tile-${grid[i][j]}`);
            }
        }
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
    }
});

function move(direction) {
    let moved = false;
    if (direction === 'up') {
        for (let j = 0; j < 4; j++) {
            for (let i = 1; i < 4; i++) {
                if (grid[i][j] !== 0) {
                    let k = i;
                    while (k > 0 && grid[k-1][j] === 0) {
                        grid[k-1][j] = grid[k][j];
                        grid[k][j] = 0;
                        k--;
                        moved = true;
                    }
                    if (k > 0 && grid[k-1][j] === grid[k][j]) {
                        grid[k-1][j] *= 2;
                        score += grid[k-1][j];
                        grid[k][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < 4; j++) {
            for (let i = 2; i >= 0; i--) {
                if (grid[i][j] !== 0) {
                    let k = i;
                    while (k < 3 && grid[k+1][j] === 0) {
                        grid[k+1][j] = grid[k][j];
                        grid[k][j] = 0;
                        k++;
                        moved = true;
                    }
                    if (k < 3 && grid[k+1][j] === grid[k][j]) {
                        grid[k+1][j] *= 2;
                        score += grid[k+1][j];
                        grid[k][j] = 0;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'left') {
        for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 4; j++) {
                if (grid[i][j] !== 0) {
                    let k = j;
                    while (k > 0 && grid[i][k-1] === 0) {
                        grid[i][k-1] = grid[i][k];
                        grid[i][k] = 0;
                        k--;
                        moved = true;
                    }
                    if (k > 0 && grid[i][k-1] === grid[i][k]) {
                        grid[i][k-1] *= 2;
                        score += grid[i][k-1];
                        grid[i][k] = 0;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < 4; i++) {
            for (let j = 2; j >= 0; j--) {
                if (grid[i][j] !== 0) {
                    let k = j;
                    while (k < 3 && grid[i][k+1] === 0) {
                        grid[i][k+1] = grid[i][k];
                        grid[i][k] = 0;
                        k++;
                        moved = true;
                    }
                    if (k < 3 && grid[i][k+1] === grid[i][k]) {
                        grid[i][k+1] *= 2;
                        score += grid[i][k+1];
                        grid[i][k] = 0;
                        moved = true;
                    }
                }
            }
        }
    }
    if (moved) {
        addNumber();
        updateGrid();
        updateScore();
    }
}

newGameButton.addEventListener('click', startGame);

startGame();
