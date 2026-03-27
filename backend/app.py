from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/generateCV', methods=['POST'])
def generate_cv():
    data = request.get_json() 
    return jsonify({'cv': data})

if __name__ == '__main__':
    app.run(debug=True)