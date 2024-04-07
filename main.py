from flask import Flask, render_template, request, jsonify, redirect
from distant import check_win
from single import bot_move
import os

board = [0,0,0,0,0,0,0,0,0,0,0]
ids = []

single_board = [0,0,0,0,0,0,0,0,0]


app = Flask(__name__, template_folder="templates")

@app.route("/")
def home():
    return render_template("home.html")


@app.route("/local")
def tictactoe():
    return render_template("local.html")


@app.route("/single")
def single():
    return render_template("single.html")


@app.route("/single/board", methods=["GET", "POST"])
def single_board():
    global single_board
    if request.method == "GET":
        single_board = bot_move(single_board)
        return jsonify({"processed": "true", "board": single_board})
    elif request.method == "POST":
        board_json = request.get_json(request)
        single_board = board_json[0]
        return jsonify({'processed': 'true'})
    else:
        pass


@app.route("/distant")
def distant():
    return render_template("distant.html")


@app.route("/distant/board", methods=["GET", "POST"])
def distant_board():
    global board
    if request.method == "GET":
        board[10] = check_win(board)
        return jsonify({"processed": "true", "board": board})
    else:
        board_json = request.get_json(request)
        board = board_json[0]
        return jsonify({'processed': 'true'})


@app.route("/distant/players", methods=["POST"])
def determine_order():
    if len(ids) < 3:
        ids.append(request.get_json(request)[0])
        board[9] = ids[0]
        return jsonify({'processed': 'true'})
    else:
        return jsonify({"processed": "true"})


@app.route("/distant/reset")
def reset():
    global ids, board
    board = [0,0,0,0,0,0,0,0,0,0,0]
    ids = []
    return redirect("/")


app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


if __name__ == "__main__":
    print("Starting app")
    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
