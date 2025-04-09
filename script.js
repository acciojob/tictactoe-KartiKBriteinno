let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = Array(9).fill(null);
let gameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submit').addEventListener('click', startGame);
});

function startGame() {
    player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();

    if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
    }

    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${player1}, you're up</div>
        <div class="grid">
            ${[...Array(9).keys()].map(i => `<div class="cell" id="${i + 1}"></div>`).join('')}
        </div>
    `;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleMove);
    });
}

function handleMove(e) {
    const index = parseInt(e.target.id) - 1;

    if (board[index] || gameOver) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        const winnerName = currentPlayer === 'X' ? player1 : player2;
        document.querySelector('.message').textContent = `${winnerName}, congratulations you won!`;
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const nextPlayer = currentPlayer === 'X' ? player1 : player2;
    document.querySelector('.message').textContent = `${nextPlayer}, you're up`;
}

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (const [a, b, c] of wins) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightCells([a, b, c]);
            return true;
        }
    }

    return false;
}

function highlightCells(indices) {
    indices.forEach(i => {
        document.getElementById((i + 1).toString()).classList.add('winning');
    });
}
