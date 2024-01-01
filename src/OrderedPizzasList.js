import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import OrderedPizzasListElement from "./OrderedPizzasListElement";

const OrderedPizzasList = ({orderedPizzasMap, data}) => {
  return (
    <div className="ordered-pizzas-list-container">
      {orderedPizzasMap && Array.from(orderedPizzasMap).map(([id, amount]) => (
        <ListGroup.Item>
          <OrderedPizzasListElement data={data} id={id} amount={amount}/>
        </ListGroup.Item>
      ))}
    </div>
  );
};

export default OrderedPizzasList;
