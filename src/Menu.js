import React, {useEffect, useState} from 'react';
import MenuList from "./MenuList";
import useFetch from "./useFetch";
import Button from 'react-bootstrap/Button';
const Menu = () => {
  const {data, isPending, error} = useFetch("http://127.0.0.1:5000/pizzas");
  const [pizzas, setPizzas] = useState(null);

  useEffect(() => {
    if (data!==null) {
      setPizzas(data);
    }
  }, [data]);

  const filterData = (type,e) => {
    document.querySelectorAll(".menu-nav-list-el").forEach((element) => {
      element.classList.remove("in-use-pizza-type");
    })
    e.target.classList.add("in-use-pizza-type");
    if (type===null){
      setPizzas(data);
    }
    else{
      setPizzas(data.filter((item) => item.type===type));
    }
  }

  return (
    <div className="menu-container">
      <div className="see-discounts">
        <p className="see-discounts-p">
          Zobacz promocje &#x25BC;
        </p>
      </div>
      <nav className="pizza-type-nav">
        <ul className="menu-nav-list">
          <li className="menu-nav-list-el in-use-pizza-type" onClick={(e) => filterData(null,e)}>Wszystkie</li>
          <li className="menu-nav-list-el" onClick={(e) => filterData("classic",e)}>Klasyczne</li>
          <li className="menu-nav-list-el" onClick={(e) => filterData("spicy",e)}>Na ostro</li>
          <li className="menu-nav-list-el" onClick={(e) => filterData("vege",e)}>Wegetariańskie</li>
          <li className="menu-nav-list-el" onClick={(e) => filterData("rich",e)}>Na bogato</li>
        </ul>
      </nav>
      <div id="menu-container-block">
        <MenuList pizzas={pizzas} isPending={isPending} error={error}/>
      </div>
      <div id="basket-container">
        <div className="basket-button-container">
          <Button className="btn btn-dark">Koszyk</Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
