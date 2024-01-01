import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

const LocationValidator = () => {
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname!=="/order"){
      localStorage.removeItem('order');
    }
  }, [location]);

};

export default LocationValidator;
