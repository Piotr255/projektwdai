import React from 'react';

const OrderedPizzasListElement = ({data, id, amount}) => {
  return (
    <div className="ordered-pizzas-element-container">
      <div className="order-element-text">
        <h3 className="order-element-header">{data[id].name}</h3>
        <span className="order-element-ingredients">{data[id].ingredients}</span>
      </div>
      <div className="order-element-amount-container">
        <span className="order-element-amount">x{amount}</span>
      </div>
    </div>
  );
};

export default OrderedPizzasListElement;
