import React, {useEffect, useRef, useState} from 'react';
import useFetch from "./useFetch";
import MenuElement from "./MenuElement";
const MenuList = ({pizzas, isPending, error}) => {


  return (
    <div>
      {error && <span>{error}</span>}
      {isPending && <h1>Wczytywanie...</h1>}
      {pizzas && pizzas.map((item) => (
        <MenuElement item={item} key={item.id}/>
      ))}
    </div>
  );
};

export default MenuList;
