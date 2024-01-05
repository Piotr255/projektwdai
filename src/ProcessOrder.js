import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
const ProcessOrder = () => {
  const location = useLocation();
  const response = location.state?.response;
  return (
    <div className="order-status-container">
      {response==="success" &&
        <div>
          <h1 className="text-green">Zamówienie złożone pomyślnie!</h1>
          <h3>Możesz opuścić stronę</h3>
          <i class="demo-icon icon-ok-circle"></i>
        </div>
      }
      {response==="failure" &&
        <div>
          <h1 className="text-red">Zamówienie nie powiodło się!</h1>
          <h3>Możesz opuścić stronę, ale w zamówieniu wystąpiły problemy</h3>
        </div>
      }
    </div>
  );
};

export default ProcessOrder;
