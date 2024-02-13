import os

import flask

app = flask.Flask(__name__)
    
@app.route("/")
def home():
    return flask.render_template("index.html")

@app.route("/script")
def get_script():
    with open(file=os.path.join(os.environ["SORT_WEB_ROOT"], "scripts", "button_scripts.js"), mode="rt") as file:
        return file.read()


if __name__ == '__main__':
    app.run(port=8000, debug=True)