import React, {useEffect, useRef, useState} from 'react';
import useFetch from "./useFetch";
import MenuElement from "./MenuElement";
const MenuList = ({pizzas, isPending, error, on_element_click, order, on_element_subtract_click}) => {

  const handleResize = () => {
    document.querySelectorAll('.menu-element-button-and-p-container').forEach((element) => {
      element.style.scale = window.innerWidth / 1000;

    })
  }
  useEffect(() => {
    if (pizzas){
      handleResize();
      window.addEventListener('resize', handleResize);
    }
  }, [pizzas]);




  return (
    <div>
      {error && <span>{error}</span>}
      {isPending && <h1>Wczytywanie...</h1>}
      {pizzas && pizzas.map((item) => (
        <MenuElement item={item} key={item.id} id={item.id} on_element_click={on_element_click}
                     order={order} on_element_subtract_click={on_element_subtract_click}/>
      ))}
    </div>
  );
};

export default MenuList;
