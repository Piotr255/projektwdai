import React from 'react';
import Button from 'react-bootstrap/Button';
const MenuElement = (props) => {
  return (
    <div className="menu-element-container">
      <div className="menu-element-text">
        <h3 className="menu-element-header">{props.item.name}</h3>
        <span className="menu-element-ingredients">{props.item.ingredients}</span>
      </div>
      <div className="menu-element-button-container">
        <div className="menu-element-button-and-p-container">
          <Button className="menu-element-button" onClick={(e) => props.on_element_click(e, props.id-1)}>{props.item.price} zł</Button>
          <p className="ordered-count">{props.order.get(props.id-1) ? props.order.get(props.id-1) : 0}</p>
          {props.order.get(props.id-1)>0 && <Button className="menu-element-subtract-1 btn btn-danger" onClick={(e) => props.on_element_subtract_click(e, props.id-1)}>-</Button>}
        </div>
      </div>
    </div>
  );
};

export default MenuElement;
