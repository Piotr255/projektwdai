import React from 'react';
import Button from 'react-bootstrap/Button';
const MenuElement = (props) => {
  return (
    <div className="menu-element-container">
      <div className="menu-element-text">
        <h3>{props.item.name}</h3>
        <span>{props.item.ingredients}</span>
      </div>
      <div className="menu-element-button">
        <Button>{props.item.price} zł</Button>
      </div>
    </div>
  );
};

export default MenuElement;
