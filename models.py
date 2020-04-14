from flask_sqlalchemy import SQLAlchemy

from faker import Faker

db = SQLAlchemy()


class Todo(db.Model):
    __tablename__ = "todos"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)

    def __repr__(self):
        return f'<Todo {self.id} | {self.name}>'

    def serialize(self):
        return {'id': self.id, 'name': self.name, 'description': self.description}

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


def connect_to_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todo_app'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = False
    db.app = app
    db.init_app(app)


def seed():
    fake = Faker()
    for _ in range(3):
        todo = Todo(name=fake.words(nb=3), description=''.join(fake.paragraph()))
        db.session.add(todo)
        db.session.commit()


if __name__ == '__main__':
    from flask import Flask
    app = Flask(__name__)
    connect_to_db(app)
    db.drop_all()

    db.create_all()
    print("Database and tables created.")
