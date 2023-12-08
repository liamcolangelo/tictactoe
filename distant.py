win_states = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


def check_win(board):
    for i in range(8):
        win = []
        for k in range(3):
            win.append(board[win_states[i][k]])
        winner = 0
        for n in range(3):
            if (winner != 0 and win[n] != winner) or win[n] == 0:
                winner = 3
                break
            else:
                winner = win[n]
        if winner != 3 and winner != 0:
            return winner

    draw = True
    for f in range(9):
        if board[f] == 0:
            draw = False
    if draw:
        return 3
    else:
        return 0

