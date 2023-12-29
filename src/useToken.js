import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import useFetch from "./useFetch";

const useToken = () => {
  const {data: users, isPending, error} = useFetch("http://localhost:5000/users");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && users){
      const decoded = jwtDecode(token);
      setUserData(users.filter((user) => user.id===decoded.sub)[0]);
    }
  }, [users]);

  return userData;

};

export default useToken;
