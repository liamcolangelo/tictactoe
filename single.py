# This file was written almost entirely by ChatGPT.
# I only had to modify small parts to integrate it into the rest of the program.
# This is the only file written by ChatGPT.

def possible_moves(board):
    moves = []
    for i in range(len(board)):
        if board[i] == 0:
            moves.append(i)
    return moves


winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


def evaluate(board):
    for combination in winning_combinations:
        symbols = [board[i] for i in combination]
        if symbols == [2, 2, 2]:
            return 1
        elif symbols == [1, 1, 1]:
            return -1
    if 0 not in board:
        return 0
    return None


def minimax(board, depth, alpha, beta, maximizing_player):
    score = evaluate(board)
    if score is not None:
        return score
    if maximizing_player:
        best_score = -float('inf')
        for move in possible_moves(board):
            board[move] = 2
            score = minimax(board, depth+1, alpha, beta, False)
            board[move] = 0
            best_score = max(best_score, score)
            alpha = max(alpha, score)
            if beta <= alpha:
                break
        return best_score
    else:
        best_score = float('inf')
        for move in possible_moves(board):
            board[move] = 1
            score = minimax(board, depth+1, alpha, beta, True)
            board[move] = 0
            best_score = min(best_score, score)
            beta = min(beta, score)
            if beta <= alpha:
                break
        return best_score


def bot_move(board):
    best_score = -float('inf')
    best_move = None
    for move in possible_moves(board):
        board[move] = 2
        score = minimax(board, 0, -float('inf'), float('inf'), False)
        board[move] = 0
        if score > best_score:
            best_score = score
            best_move = move
    board[best_move] = 2
    return board
