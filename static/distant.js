let turn = false;
let id = Math.random();
let start = 1;
let board = [0,0,0,0,0,0,0,0,0,0,0];
let has_won = false;
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

$.ajax({
    type: "POST",
    url: "/distant/players",
    data: JSON.stringify([id]),
    contentType: "application/json",
    dataType: 'json'
});



function take_turn(button) {
    if ((! has_won) && board[button] == 0 && turn) {
        board[button] = id;
        document.getElementById("b" + button).innerHTML = "X";
        turn = false;
        $.ajax({
            type: "POST",
            url: "/distant/board",
            data: JSON.stringify([board]),
            contentType: "application/json",
            dataType: 'json'
        });
    }
}

function check_difference (new_board) {
    difference = false
    for (let i = 0; i < 9; i++) {
        if (board[i] != new_board[i]) {
            difference = true;
            break;
        }
    }
    return difference;
}



document.getElementById("home").addEventListener("click", function () {window.location.href = "/distant/reset"});
document.getElementById("b0").addEventListener("click", function () {take_turn("0")});
document.getElementById("b1").addEventListener("click", function () {take_turn("1")});
document.getElementById("b2").addEventListener("click", function () {take_turn("2")});
document.getElementById("b3").addEventListener("click", function () {take_turn("3")});
document.getElementById("b4").addEventListener("click", function () {take_turn("4")});
document.getElementById("b5").addEventListener("click", function () {take_turn("5")});
document.getElementById("b6").addEventListener("click", function () {take_turn("6")});
document.getElementById("b7").addEventListener("click", function () {take_turn("7")});
document.getElementById("b8").addEventListener("click", function () {take_turn("8")});
var intervalID = window.setInterval(refresh, 1000);

function refresh () {
    let new_board = $.ajax({
        type: "GET",
        url: "/distant/board",
        contentType: "application/json",
        dataType: 'json'
    });

    new_board.then(function(data) {
        console.log("Response received:", data);
        new_board = data["board"];
        for (let i = 0; i < 9; i++) {
            if (new_board[i] != id && new_board[i] != 0) {
                document.getElementById("b" + i).innerHTML = "O";
            }
        }
        if (new_board[10] == id) {
            document.getElementById("display").innerHTML = "You Win!";
            has_won = true;
        } else if (new_board[10] != 0 && new_board[10] != 3) {
            document.getElementById("display").innerHTML = "You Lose!";
            has_won = true;
        } else if (new_board[10] == 3) {
            document.getElementById("display").innerHTML = "Draw!";
            has_won = true;
        } else if (check_difference(new_board)) {
            console.log("board:" + board);
            console.log("new_board: " + new_board);
            turn = true;
            board = new_board;
        } else {}
        initial_turn = true;
        for (let i = 0; i < 9; i++) {
            if (board[i] != 0) {
                initial_turn = false;
                break;
            }
        }
        if (initial_turn && new_board[9] == id) {
            turn = true;
        }
        
    }).catch(function(error) {
        console.log("Error occurred:", error);
    });
};

