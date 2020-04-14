from flask import Flask, render_template, request, jsonify, json
from flask_cors import CORS, cross_origin
from models import Todo, connect_to_db, db

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
@cross_origin()
def todo_view():
    """React view."""
    return render_template('index.html')


@app.route('/api/v1/todos')
@cross_origin()
def todo_list():
    todos = Todo.query.all()
    app.logger.info(f"Total items: {Todo.query.count()}")
    return jsonify([todo.serialize() for todo in todos])


@app.route('/api/v1/todos', methods=['POST'])
@cross_origin()
def todo_new():
    app.logger.info('Creating a new todo item...')
    data = json.loads(request.data.decode('utf-8'))
    todo = Todo(**data)
    todo.save()
    app.logger.info(todo)

    return jsonify(todo.serialize())


@app.route('/api/v1/todos', methods=['DELETE'])
def get_todo():
    data = json.loads(request.data.decode('utf-8'))
    todo = Todo.query.get(data['id'])
    todo.delete()
    return jsonify({}), 204


if __name__ == '__main__':
    app.debug = True
    connect_to_db(app)

    app.run(port=4000)
