from flask import Flask, jsonify, request, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import post_load
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)

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
    password = db.Column(db.String)
    name = db.Column(db.String)
    bonus_count = db.Column(db.Integer)
    bonus_iter = db.Column(db.Integer) # Która w kolejności zamówiona pizza do bonusu
    order = db.relationship('Order', backref='user')
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
def add_discount_to_database(type, description, active, discount):
    new_discount = Discount(type=type,description=description,active=active,discount=discount)
    db.session.add(new_discount)
    db.session.commit()
    
def add_pizza_to_database(name, ingredients, price, type):
    new_pizza = Pizza(name=name, ingredients=ingredients, price=price, type=type)
    db.session.add(new_pizza)
    db.session.commit()
    
def add_user_to_database(email, password, name, bonus_count, bonus_iter):
    new_user = User(email=email,password=password,name=name,bonus_count=bonus_count,bonus_iter=bonus_iter)
    db.session.add(new_user)
    db.session.commit()
    
with app.app_context():
    db.drop_all()
    db.create_all()
    db.session.commit()
    #Dodawanie przykładowych pizz
    add_pizza_to_database(name="Margheritta",
    ingredients = "sos, ser",
    price=19.99, type="classic")
    add_pizza_to_database(name="Prosciutto",
    ingredients="sos, ser, szynka parmeńska, pomidorki koktajlowe, oliwki czarne, rukola,"
                +" oliwa z oliwek",
    price=28.99,type="rich")
    add_pizza_to_database(name="Chicken lux",
    ingredients="sos, ser, pieczarki, kurczak, szynka, czerwona cebula,"
                +" kolorowa papryka, oregano",
    price=26.99,type="rich")
    add_pizza_to_database(name="Farmerska",
    ingredients="sos, ser, papryka kolorowa, brokuły, ser camembert, oregano",
    price=25.99,type="vege")
    add_pizza_to_database(name="Chicken Mexicana",
    ingredients="sos, ser, kurczak, kukurydza, papryka jalapeno, cebula, oregano",
    price=24.99, type="spicy")
    add_pizza_to_database(name="Don Pedro",
    ingredients="sos z ostrą papryką CHIPOTLE PEPPER, ser, mielona wołowina, fasola"
                " czerwona, kukurydza, kolendra",
    price=29.99, type="spicy")
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
    
    #Dodawanie przykładowych userów
    add_user_to_database("strzyztymon@jazdzyk-durlik.pl", "pXPan^aq@6", "Tymoteusz", 1, 3)
    add_user_to_database("zsobstyl@yahoo.com", "!6Pvk8irqz", "Marcel", 2, 0)
    add_user_to_database("fpracz@yahoo.com", "&2(M$Lx(CB", "Janina", 0, 4)
    add_user_to_database("ebasaj@spoldzielnia.com", "fQ+S8AlrhO", "Tola", 1, 4)
    add_user_to_database("dkunka@interia.pl", "X*z0LK4yjy", "Przemysław", 1, 2)
    
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
    
@app.route('/discounts', methods=['GET'])
@cross_origin()
def get_all_discounts():
    discounts = Discount.query.all()
    return jsonify(DiscountSchema(many=True).dump(discounts))
    
if __name__ == '__main__':
    app.run()