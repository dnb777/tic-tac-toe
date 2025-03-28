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
