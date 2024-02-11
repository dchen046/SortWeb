import flask


app = flask.Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/bbb")
def bbb():
    return "<p>eatme</p>"


if __name__ == '__main__':
    app.run(port=8000, debug=True)