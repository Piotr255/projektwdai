import React from 'react';
import MenuList from "./MenuList";

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="see-discounts">
        <p className="see-discounts-p">
          Zobacz promocje &#x25BC;
        </p>
      </div>
      <main className="menu-and-nav-container">
        <nav className="pizza-type-nav">
          <ul className="menu-nav-list">
            <li className="menu-nav-list-el">Wszystkie</li>
            <li className="menu-nav-list-el">Klasyczne</li>
            <li className="menu-nav-list-el">Na ostro</li>
            <li className="menu-nav-list-el">Wegetariańskie</li>
            <li className="menu-nav-list-el">Na bogato</li>
          </ul>
        </nav>
        <section id="menu-container-block">
          <MenuList />
        </section>
      </main>
    </div>
  );
};

export default Menu;
