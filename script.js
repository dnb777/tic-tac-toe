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
        board[row * 3 + column] = token
    }

    return {getBoard, printBoard, placeToken}
})();
