import os
from hmac import compare_digest
import bcrypt
import jwt
from flask import Flask, jsonify, request, url_for
from flask_jwt_extended import JWTManager, create_access_token
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import post_load
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)
logreg = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET')


class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    ingredients = db.Column(db.String)
    price = db.Column(db.Float)
    type = db.Column(db.String)
    order_detail = db.relationship('OrderDetail', backref='pizza')


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, nullable=False, unique=True)
    bonus_count = db.Column(db.Integer, default=0)
    bonus_iter = db.Column(db.Integer, default=0)  # Która w kolejności zamówiona pizza do bonusu
    order = db.relationship('Order', backref='user')

    # def check_password(self, password):
    #     return compare_digest(password, "password")
    def check_password(self, provided_password):
        return bcrypt.checkpw(provided_password.encode('utf-8'), self.password)


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime)
    expected_shipped_date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    order_detail = db.relationship('OrderDetail', backref='order')


class OrderDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'))
    pizza_count = db.Column(db.Integer)
    price = db.Column(db.Float)


class PizzaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Pizza

    @post_load
    def make_pizza(self, data, **kwargs):
        return Pizza(**data)


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)


def add_pizza_to_database(name, ingredients, price, type):
    new_pizza = Pizza(name=name, ingredients=ingredients, price=price, type=type)
    db.session.add(new_pizza)
    db.session.commit()


def add_user_to_database(email, password, name, bonus_count, bonus_iter):
    new_user = User(email=email, password=password, username=name, bonus_count=bonus_count, bonus_iter=bonus_iter)
    db.session.add(new_user)
    db.session.commit()


with app.app_context():
    # db.drop_all()
    # db.create_all()
    db.session.commit()
    # Dodawanie przykładowych pizz
    add_pizza_to_database(name="Margheritta",
                          ingredients="sos, ser",
                          price=19.99, type="classic")
    add_pizza_to_database(name="Prosciutto",
                          ingredients="sos, ser, szynka parmeńska, pomidorki koktajlowe, oliwki czarne, rukola,"
                                      + " oliwa z oliwek",
                          price=28.99, type="rich")
    add_pizza_to_database(name="Chicken lux",
                          ingredients="sos, ser, pieczarki, kurczak, szynka, czerwona cebula,"
                                      + " kolorowa papryka, oregano",
                          price=26.99, type="rich")
    add_pizza_to_database(name="Farmerska",
                          ingredients="sos, ser, papryka kolorowa, brokuły, ser camembert, oregano",
                          price=25.99, type="vege")
    add_pizza_to_database(name="Chicken Mexicana",
                          ingredients="sos, ser, kurczak, kukurydza, papryka jalapeno, cebula, oregano",
                          price=24.99, type="spicy")

    # Dodawanie przykładowych userów
    # add_user_to_database("strzyztymon@jazdzyk-durlik.pl", "", "Tymoteusz", 1, 3)
    # add_user_to_database("zsobstyl@yahoo.com", "!6Pvk8irqz", "Marcel", 2, 0)
    # add_user_to_database("fpracz@yahoo.com", "&2(M$Lx(CB", "Janina", 0, 4)
    # add_user_to_database("ebasaj@spoldzielnia.com", "fQ+S8AlrhO", "Tola", 1, 4)
    # add_user_to_database("dkunka@interia.pl", "X*z0LK4yjy", "Przemysław", 1, 2)


@app.route('/pizzas', methods=['GET'])
@cross_origin()
def get_all_pizzas():
    pizzas = Pizza.query.all()
    return jsonify(PizzaSchema(many=True).dump(pizzas))


@app.route('/users', methods=['GET'])
@cross_origin()
def get_all_users():
    users = User.query.all()
    return jsonify(UserSchema(many=True).dump(users))


def hash_password(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password


#
# @jwt.user_identity_loader
# def user_identity_lookup(user):
#     return user.id
# @jwt.user_lookup_loader
# def user_lookup_callback(_jwt_header, jwt_data):
#     identity = jwt_data["sub"]
#     return User.query.filter_by(id=identity).one_or_none()
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401

    # Notice that we are passing in the actual sqlalchemy user object here
    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)


@app.route("/registration", methods=["POST"])
def registration():
    email = request.json.get("email", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(username=username).one_or_none()
    if user:
        return jsonify("Use different username"), 401
    hashed_password = hash_password(password)
    new_user = User(email=email, username=username, password=hashed_password)
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

    return jsonify("User registered successfully"), 200


if __name__ == '__main__':
    app.run()
