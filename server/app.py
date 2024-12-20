import os
from datetime import datetime
from hmac import compare_digest
import bcrypt
import jwt
from flask import Flask, jsonify, request, url_for
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import post_load
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from flask_cors import CORS, cross_origin
from datetime import datetime


def load_env_variables(env_file=".env"):
    with open(env_file, "r") as file:
        for line in file:
            if line.strip() and not line.startswith('#'):
                key, value = line.strip().split('=', 1)
                os.environ[key] = value


load_env_variables()
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
    


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    password = db.Column(db.Text, nullable=False)
    username = db.Column(db.Text, nullable=False, unique=True)
    bonus_count = db.Column(db.Integer, default=0)
    bonus_iter = db.Column(db.Integer, default=0)  # Która w kolejności zamówiona pizza do bonusu
    order = db.relationship('Order', backref='user')
    phone = db.Column(db.String)
    address1 = db.Column(db.String)
    address2 = db.Column(db.String)
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
    phone = db.Column(db.String)
    email = db.Column(db.String)
    total_price = db.Column(db.Float)
    address1 = db.Column(db.String)
    address2 = db.Column(db.String)
    finished = db.Column(db.Boolean)
    with_delivery = db.Column(db.Boolean)
    coupon_used = db.Column(db.Boolean)


class OrderDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'))
    pizza_count = db.Column(db.Integer)
    
    price = db.Column(db.Float) #do usunięcia

    pizza = db.relationship('Pizza', backref='details')

class Discount(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    description = db.Column(db.String)
    active = db.Column(db.Boolean)
    discount = db.Column(db.Float)


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


class DiscountSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Discount

    @post_load
    def make_discount(self, data, **kwargs):
        return Discount(**data)

class OrderSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Order
        include_fk = True
    @post_load
    def make_order(self,data,**kwargs):
        return Order(**data)
    
class OrderDetailSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = OrderDetail
        include_fk = True
    @post_load
    def make_order_detail(self,data,**kwargs):
        return OrderDetail(**data)
def add_discount_to_database(type, description, active, discount):
    new_discount = Discount(type=type, description=description, active=active, discount=discount)
    db.session.add(new_discount)
    db.session.commit()


def add_pizza_to_database(name, ingredients, price, type):
    new_pizza = Pizza(name=name, ingredients=ingredients, price=price, type=type)
    db.session.add(new_pizza)
    db.session.commit()


def add_user_to_database(email, password, name, bonus_count, bonus_iter):
    new_user = User(email=email, password=password, username=name, bonus_count=bonus_count, bonus_iter=bonus_iter)
    db.session.add(new_user)
    db.session.commit()


def add_bonus_to_user(username):
    usr = User.query.filter_by(username=username).first()
    usr.bonus_count += 1
    db.session.commit()


# with app.app_context():
# add_bonus_to_user("Stiffo")


def add_order_to_database(user_id, order_date_str, expected_shipped_date_str, phone, email):
    order_date = datetime.strptime(order_date_str, "%Y-%m-%d")
    expected_shipped_date = datetime.strptime(expected_shipped_date_str, "%Y-%m-%d")

    new_order = Order(user_id=user_id, order_date=order_date, expected_shipped_date=expected_shipped_date,phone=phone,email=email)
    db.session.add(new_order)
    db.session.commit()


def add_order_detail_to_database(order_id, pizza_id, pizza_count, price):
    new_order_detail = OrderDetail(order_id=order_id, pizza_id=pizza_id, pizza_count=pizza_count, price=price)
    db.session.add(new_order_detail)
    db.session.commit()


with app.app_context():
    db.create_all()
    db.session.query(Pizza).delete()
    db.session.query(Discount).delete()
    db.session.commit()
    # Dodawanie przykładowych pizz
    #add_order_to_database(user_id=5, order_date_str="2023-01-01", expected_shipped_date_str="2023-01-03")
    #add_order_detail_to_database(order_id= 4 , pizza_id=1, pizza_count=2, price=19.99)

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
    add_pizza_to_database(name="Kentucky",
                          ingredients="sos, ser x2, kurczak BBQ, czerwona cebula, oregano",
                          price=21.99, type="classic")
    add_pizza_to_database(name="Szefa",
                          ingredients="sos, ser, pieczarki, szynka, salami, boczek, pomidory, mix oliwek, oregano",
                          price=25.99, type="rich")
    add_pizza_to_database(name="Z Rukolą",
                          ingredients="sos, ser, rukola, czarne oliwki, czosnek, pomidory, oregano",
                          price=24.99, type="vege")
    add_pizza_to_database(name="Grecka",
                          ingredients="sos, ser, pomidory, cebula, czosnek, ser feta, oliwki, oregano",
                          price=24.99, type="vege")

    add_discount_to_database("casual2",
                             "cheapest one of at least 2 pizzas 20% off",
                             True,
                             20)


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


@app.route('/discounts', methods=['GET'])
@cross_origin()
def get_all_discounts():
    discounts = Discount.query.all()
    return jsonify(DiscountSchema(many=True).dump(discounts))


def order_to_dict(order):
    return {
        "id": order.id,
        "totalprice": order.total_price,
        "order_date": order.order_date.isoformat() if order.order_date else None,
        "expected_shipped_date": order.expected_shipped_date.isoformat() if order.expected_shipped_date else None,
        "order_details": [
            {
                "pizza_id": detail.pizza.name,
                "pizza_count": detail.pizza_count,
                "pricesolo": detail.pizza.price
            } for detail in order.order_detail
        ]
    }


def user_to_dict(user):
    return {
        "email": user.email,
        "username": user.username,
        "bonus_count": user.bonus_count,
        "bonus_iter": user.bonus_iter,
        'order': [order_to_dict(o) for o in user.order]
    }
@app.route('/orders',methods=['GET'])
@cross_origin()
def get_all_orders():
    orders = Order.query.all()
    return jsonify(OrderSchema(many=True).dump(orders))

@app.route('/order_details',methods=['GET'])
@cross_origin()
def get_all_order_details():
    all_order_details = OrderDetail.query.all()
    return jsonify(OrderDetailSchema(many=True).dump(all_order_details))

@app.route('/profile')
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'Użytkownik nie znaleziony'}), 404
    user_data = user_to_dict(user)
    return jsonify(user_data)

@app.route('/process_order',methods=['POST'])
def process_order():
    ordered_pizzas_obj = request.json.get("ordered_pizzas_obj", None)
    coupon_used = request.json.get("coupon_used", None)
    total_price = request.json.get("total_price", None)
    email = request.json.get("email", None)
    user_id = request.json.get("user_id", None)
    phone = request.json.get("phone", None)
    address1 = request.json.get("address1", None)
    address2 = request.json.get("address2", None)
    with_delivery = request.json.get("with_delivery", None)
    try:
        new_order = Order(order_date=datetime.now(),expected_shipped_date=None,
                          user_id=user_id,phone=phone,email=email,
                          total_price=total_price,address1=address1,
                          address2=address2,finished=False,
                          with_delivery=with_delivery, coupon_used=coupon_used)
        db.session.add(new_order)
        db.session.commit()
        order_id = new_order.id
        pizza_count = 0
        for pizza_id, quantity in ordered_pizzas_obj.items():
            pizza_count+=quantity
            new_order_detail = OrderDetail(order_id=order_id,
                                           pizza_id=str(int(pizza_id)+1),
            #pizza_id + 1, bo json zaczyna się od 0, a id od 1
                                           pizza_count=quantity,
                                           price=None)
            db.session.add(new_order_detail)
            db.session.commit()
        if user_id:
            user = User.query.get(user_id)
            if coupon_used:
                user.bonus_count-=1
                pizza_count-=1
            current_bonus_iter = user.bonus_iter
            current_bonus_count = user.bonus_count
            while pizza_count>0:
                current_bonus_iter+=1
                if current_bonus_iter==5:
                    current_bonus_iter=0
                    current_bonus_count+=1
                pizza_count-=1
            user.bonus_iter = current_bonus_iter
            user.bonus_count = current_bonus_count
            user.phone = phone
            user.address1 = address1
            user.address2 = address2
            db.session.commit()
    except Exception as e:
        print(e)
        return "failure"
    return "success"

if __name__ == '__main__':
    app.run()
