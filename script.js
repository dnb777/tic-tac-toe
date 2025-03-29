//modulo que gestiona el estado del tablero
const gameboard = (function(){
    const board = [" "," "," "," "," "," "," "," "," "];

    const getBoard = () => board;

    //imprime el tablero como cuadricula 3x3 con separadores
    const printBoard = () => {
        console.log(
            board[0] + " | " + board[1] + " | " + board[2] + "\n" +
            "--+---+--" + "\n" +
            board[3] + " | " + board[4] + " | " + board[5] + "\n" + 
            "--+---+--" + "\n" +
            board[6] + " | " + board[7] + " | " + board[8]
        )
    };

    const placeToken = (row, column, token) => {
        const index = row * 3 + column;
        if (board[index] !== " "){
            console.log("invalid move, cell already occupied")
            return false;
        }else {
            board[index] = token;
            return true;
        }
    }

    return {getBoard, printBoard, placeToken}
})();

// Gestiona los juagadores y los turnos
const createPlayers = (function (playerOne = "Player One", playerTwo = "Player Two"){
    const playerList = [
        {
            name: playerOne,
            token: "X"
        },
        {
            name: playerTwo,
            token: "O"
        }
    ];

    let activePlayer = playerList[0];
    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerList[0] ? playerList[1] : playerList[0];
    }

    return {getActivePlayer, switchActivePlayer}
})();

//controla el flujo del juego
const gameController = () => {
    const players = createPlayers;
    const board = gameboard;
    let gameOver = false;

    //imprime el turno del juagador
    const printRound = () => {
        console.log(`${players.getActivePlayer().name}'s turn`)
    }

    const playRound = (row, column) => {
        if (gameOver) {
            console.log("Game is over, no more moves allowed!");
            return;
        }
        if(board.placeToken(row, column, players.getActivePlayer().token)){
            board.printBoard();
            const winner = checkWinner();
            if (winner === true){
                console.log(`${players.getActivePlayer().name} wins!`);
                gameOver = true;
            }else if(winner === "tie"){
                console.log("It's a tie!");
                gameOver = true;
            }else {
                players.switchActivePlayer();
                printRound();
            }
        }
    }
    printRound();

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7], 
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const currentBoard = board.getBoard();

        for (let i = 0; i < winningConditions.length; i++){
            const [a, b, c] = winningConditions[i];
            if (currentBoard[a] === currentBoard[b] && 
                currentBoard[b] === currentBoard[c] &&
                currentBoard[a] !== " "){
                return true;
            }
        }

        if (!currentBoard.includes(" ")){
            return "tie";
        }

        return false;
    }

    return { printRound, playRound}
}



const displayController = (function(){
    const board = gameboard.getBoard();
    const cells = document.querySelectorAll(".cell");
    const message = document.querySelector(".message");

    const render = () => {
        cells.forEach((cell) => {
            cell.textContent = board[cell.dataset.index];
        })
    }

    const init = () => {
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                const index = cell.dataset.index;

                game.playRound(index)

            })
        })
    }


    const printMessage = (text) => {
        message.textContent = text;
    }

    return {render, printMessage, init}
})();


const game = gameController();
displayController.init();