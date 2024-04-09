from src.algorithms.runner import AlgorithmRunner
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    ar = AlgorithmRunner()
    ar.run()
    return 'Hello world!'

if __name__ == '__main__':
    app.run(debug=True)
