import React from 'react';
import useFetch from "./useFetch";
import MenuElement from "./MenuElement";
const MenuList = () => {

  const {data, isPending, error} = useFetch("http://127.0.0.1:5000/pizzas");
  console.log(data);
  return (
    <div>
      {error && <span>error</span>}
      {isPending && <h1>Wczytywanie...</h1>}
      {data && data.map((item) => (
        <MenuElement item={item}/>
      ))}
    </div>
  );
};

export default MenuList;
