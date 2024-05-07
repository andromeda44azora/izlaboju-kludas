from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    # teksts = "lalalalala! \n"
    # fails = open("teksts.txt", "a")
    # fails.write(teksts)
    # fails.close()
    # fails = open("teksts.txt", "r")
    # for rinda in fails:
    #   print(rinda)
    # fails.close()
    return render_template('chats.html')

banned_users = set()

@app.route('/sutit', methods=['POST'])
def suta():
    rezultats = request.json

    if rezultats["user"] in banned_users:
        return jsonify("Banned user cannot send messages")

    if rezultats["zina"] == "\clear":
        with open("teksts.txt", "w") as fails:
            fails.write("")
        return jsonify("Clear")

    with open("teksts.txt", "a") as fails:
        fails.write(rezultats["user"] + " - " + rezultats["zina"] + "\n")

    return jsonify("OK")
  
@app.route('/lasit')
def lasa():
  zinas=[]
  with open("teksts.txt", "r") as fails:
    for rinda in fails:
      zinas.append(rinda)
  return jsonify(zinas)

@app.route('/ban_user', methods=['POST'])
def ban_user():
    data = request.json
    username_to_ban = data.get("username")

    banned_users.add(username_to_ban)

    return jsonify("Lietotājs {username_to_ban} ir banned")


app.run(host='0.0.0.0', port=81)