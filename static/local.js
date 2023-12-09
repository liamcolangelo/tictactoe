let turn = 1;
let start = 1;
let board = [0,0,0,0,0,0,0,0,0];

let win_states = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let has_won = false;

function check_win() {

    for (let i = 0; i < 8; i++) {
        let win = [];
        for (let k = 0; k < 3; k++) {
            win.push(board[win_states[i][k]]);
        }
        let winner = 0;
        for (let n = 0; n < 3; n++) {
            if ((winner != 0 && win[n] != winner) || win[n] == 0) {
                winner = 3;
                break;
            } else {
                winner = win[n];
            }
        }
        if (winner != 3 && winner != 0) {
            has_won = true;
            document.getElementById("reset").innerHTML = "Play Again";
            return winner;
        }
    }

    let draw = true;
    for (let f = 0; f < 9; f++) {
        if (board[f] == 0) {
            draw = false;
        }
    }
    if (draw) {
        has_won = true;
        document.getElementById("reset").innerHTML = "Play Again";
        return 3;
    } else {
        return 0;
    }
}



function take_turn(button) {
    if ((! has_won) && board[button] == 0) {
        board[button] = turn;
        if (turn == 1) {
            document.getElementById("b" + button).innerHTML = "X";
        } else {
            document.getElementById("b" + button).innerHTML = "O";
        }

        let winner = check_win();
        if (winner == 3) {
            document.getElementById("display").innerHTML = "Draw!";
        } else if (winner != 0) {
            document.getElementById("display").innerHTML = "Player " + winner + " Wins!";
        } else {
            if (turn == 1) {
                turn = 2;
            }
            else {
                turn = 1;
            }
        }
    }
}



document.getElementById("home").addEventListener("click", function () {window.location.href = "/"});
document.getElementById("b0").addEventListener("click", function () {take_turn("0")});
document.getElementById("b1").addEventListener("click", function () {take_turn("1")});
document.getElementById("b2").addEventListener("click", function () {take_turn("2")});
document.getElementById("b3").addEventListener("click", function () {take_turn("3")});
document.getElementById("b4").addEventListener("click", function () {take_turn("4")});
document.getElementById("b5").addEventListener("click", function () {take_turn("5")});
document.getElementById("b6").addEventListener("click", function () {take_turn("6")});
document.getElementById("b7").addEventListener("click", function () {take_turn("7")});
document.getElementById("b8").addEventListener("click", function () {take_turn("8")});
document.getElementById("reset").addEventListener("click", function() {
    if (has_won) {
        board = [0,0,0,0,0,0,0,0,0];
        if (start == 1) {
            start = 2;
        } else {
            start = 1;
        }
        turn = start;
        has_won = false;
        document.getElementById("b0").innerHTML = "";
        document.getElementById("b1").innerHTML = "";
        document.getElementById("b2").innerHTML = "";
        document.getElementById("b3").innerHTML = "";
        document.getElementById("b4").innerHTML = "";
        document.getElementById("b5").innerHTML = "";
        document.getElementById("b6").innerHTML = "";
        document.getElementById("b7").innerHTML = "";
        document.getElementById("b8").innerHTML = "";
        document.getElementById("reset").innerHTML = "";
        document.getElementById("display").innerHTML = "";
    }
});
