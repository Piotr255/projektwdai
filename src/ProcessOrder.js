import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
const ProcessOrder = () => {
  const location = useLocation();
  const response = location.state?.response;
  return (
    <div className="order-status-container">
      {response==="success" &&
        <h1 className="text-green">Zamówienie złożone pomyślnie!</h1>
      }
      {response==="failure" &&
        <h1 className="text-red">Zamówienie nie powiodło się!</h1>
      }
    </div>
  );
};

export default ProcessOrder;
