from flask import Flask, jsonify
from flask_cors import CORS
from routes.predictRoute import predict_blueprint

app = Flask(__name__)

CORS(app)

app.register_blueprint(predict_blueprint, url_prefix='/api')

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the Flask API'})

if __name__ == '__main__':  # Corrected this line
    app.run(debug=True)
