//your JS code here. If required.
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = Array(9).fill(null);
let gameOver = false;

document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', startGame);
});

function startGame() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (!player1 || !player2) {
        alert("Please enter both player names!");
        return;
    }

    const container = document.querySelector('.container');
    container.innerHTML = `
        <h1>Tic Tac Toe</h1>
        <div class="message">${player1}, you're up</div>
        <div class="grid" id="board">
            ${Array.from({ length: 9 }, (_, i) => `<div class="cell" id="${i + 1}"></div>`).join('')}
        </div>
    `;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleMove);
    });
}

function handleMove(e) {
    const id = parseInt(e.target.id) - 1;

    if (board[id] || gameOver) return;

    board[id] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        const winner = currentPlayer === 'X' ? player1 : player2;
        document.querySelector('.message').textContent = `${winner}, congratulations you won!`;
        highlightWinningCells();
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

    for (let combo of wins) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            document.querySelectorAll('.cell')[a].classList.add('winning');
            document.querySelectorAll('.cell')[b].classList.add('winning');
            document.querySelectorAll('.cell')[c].classList.add('winning');
            return true;
        }
    }
    return false;
}
