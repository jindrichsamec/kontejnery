from app import app
from .models.container import Container


@app.route('/')
def hello_world():
    return jsonify({'data': 'Hello, world!'})