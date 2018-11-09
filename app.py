from flask import Flask, render_template, request, jsonify
from models import Todo, connect_to_db

app = Flask(__name__)


@app.route('/')
def index():
    """Static sanity test! No information is displayed on this page."""
    return render_template('index.html')


@app.route('/todos')
def todo_view():
    """React view."""
    return render_template('todos/list.html')


@app.route('/api/v1/todos')
def todo_list():
    todo_objs = Todo.query.all()
    todos = []
    for item in todo_objs:
        todo = item.__dict__
        del todo['_sa_instance_state']
        todos.append(todo)

    app.logger.info("Total items: ", len(todos))
    return jsonify(todos)


@app.route('/api/v1/todo', methods=['POST'])
def todo_new():
    new_todo = Todo(**request.data).__dict__
    del new_todo['_sa_instance_state']
    app.logger.info(new_todo)

    return jsonify(new_todo)


if __name__ == '__main__':
    app.debug = True
    connect_to_db(app)

    app.run(port=4000)
