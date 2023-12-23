import React from 'react';
import useFetch from "./useFetch";

const MenuList = () => {

  const {data, isPending, error} = useFetch("http://127.0.0.1:5000/pizzas");
  console.log(data);
  return (
    <div>
      
    </div>
  );
};

export default MenuList;
