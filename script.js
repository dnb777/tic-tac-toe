//modulo que gestiona el estado del tablero
const gameboard = (function(){
    const board = [" "," "," "," "," "," "," "," "," "];
    // const board = ["X","X","O","O","X","O","X","O","O"];


    const getBoard = () => board;

    const placeToken = (index, token) => {
        // const index = row * 3 + column;
        if (board[index] !== " "){
            displayController.printMessage("invalid move, cell already occupied")
            return false;
        }else {
            board[index] = token;
            return true;
        }
    }

    return {getBoard, placeToken}
})();

// Gestiona los juagadores y los turnos
const createPlayers = (playerOne, playerTwo) => {
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

    const resetTurn = () => {
        activePlayer = playerList[0];
    }

    return {getActivePlayer, switchActivePlayer, resetTurn}
};

//controla el flujo del juego
const gameController = () => {
    const playerOneName = document.querySelector("#player-one").value || "Player One";
    const playerTwoName = document.querySelector("#player-two").value || "Player Two";
    const resetBtn = document.querySelector(".restart");

    const players = createPlayers(playerOneName, playerTwoName);
    const board = gameboard;
    let gameOver = false;

    //imprime el turno del juagador
    const printRound = () => {
        displayController.render();
        displayController.printMessage(`${players.getActivePlayer().name}'s turn`)
    }

    const playRound = (index) => {
        if (gameOver) {
            displayController.printMessage("Game is over, no more moves allowed!")
            return;
        }
        if(board.placeToken(index, players.getActivePlayer().token)){
            const winner = checkWinner();
            displayController.render();
            if (winner === true){
                displayController.printMessage(`${players.getActivePlayer().name} wins!`)
                gameOver = true;
            }else if(winner === "tie"){
                displayController.printMessage("It's a tie!")
                gameOver = true;
            }else {
                players.switchActivePlayer();
                displayController.printMessage(`${players.getActivePlayer().name}'s turn`)

            }
        }
    }
    printRound()

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

    function resetGame() {
        board.getBoard().forEach((cell, index, array) => {
            array[index] = " ";
            players.resetTurn();
            printRound();
            gameOver = false;
        })
    }

    resetBtn.addEventListener("click", resetGame)

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