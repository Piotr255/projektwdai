import React, {useContext, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import OrderedPizzasList from "./OrderedPizzasList";
import {useNavigate} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {AuthContext} from "./AuthContext";
import useToken from "./useToken";
const Order = () => {
  const userData = useToken();
  const { isLog, log, nolog } = useContext(AuthContext);
  const [order] = useState(JSON.parse(localStorage.getItem('order')));
  const [orderedPizzasMap, setOrderedPizzasMap] = useState(new Map());
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isDelivery, setIsDelivery] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (order){
      setOrderedPizzasMap(new Map(Object.entries(order.orderedPizzasObj)));
    }
    else{
      navigate('/menu');
    }

  }, [order]);
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    localStorage.removeItem('order');
  }
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (userData){
      setEmail(userData.email);
      setPhone(userData.phone);
      setAddress1(userData.address1);
      setAddress2(userData.address2);
    }
  }, [userData]);

  const calculatePizzaCount = () => {
    let pizzaCount = 0;
    Array.from(orderedPizzasMap).map(([id, amount]) => {
      pizzaCount+=amount;
    })
    return pizzaCount;
  }

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
  function validatePhoneNumber(phoneNumber) {
    const regex = /^(\+\d{2}\s?)?\d{3}\s?\d{3}\s?\d{3}$/;

    return regex.test(phoneNumber);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email,
      phone,
      isDelivery,
      address1,
      address2
    };
    console.log(formData);
    let validation = true;
    if (!validatePhoneNumber(phone)){
      validation=false;
      setInvalidPhone(true);
    }
    if (isDelivery && isBlank(address1)){
      validation = false;
      setInvalidAddress(true);
    }
    if (validation){
      console.log(order.total_price);
      let user_id = null;
      if (userData){
        user_id = userData.id;
      }
      fetch("http://localhost:5000/process_order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order: order.data,
          ordered_pizzas_obj: order.orderedPizzasObj,
          coupon_used: order.couponUsed,
          email: email,
          phone: phone,
          user_id: user_id,
          address1: address1,
          address2: address2,
          total_price: order.totalPrice,
          with_delivery: isDelivery
        })
      }).then((response) => response.text())
        .then((result) => {
          navigate('/process_order', {state: {response: result}});
        })
    }
  };

  const handleSetPhone = (e) => {
    setPhone(e.target.value);
    setInvalidPhone(false);
  }

  const handleSetAddress1 = (e) => {
    setAddress1(e.target.value);
    setInvalidAddress(false);
  }

  const handleSetIsDelivery = (e) => {
    setIsDelivery(e.target.checked);
    setInvalidAddress(false);
  }

  const handleLeavePage = () => {
    localStorage.removeItem('order');
    navigate('/menu');
  }
  const handleStayOnPage = () => {
    setShowLeavePopup(false);
  }
  if (order){
  return (
    <div className="order-form-container">
      <header className="order-form-header">
        <h1>W celu złożenia zamówienia należy wypełnić formularz</h1>
        <span>Opuszczenie strony skutkuje niezapisaniem zamówienia</span>
      </header>
      <main className="order-form-main">
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email*</Form.Label>
              <Form.Control type="email" placeholder="Podaj email" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
              <Form.Label>Nr telefonu*</Form.Label>
              <Form.Control type="tel" placeholder="Podaj nr telefonu" value={phone}
                            onChange={(e) => handleSetPhone(e)}
                            isInvalid={invalidPhone}/>
              {invalidPhone && <Form.Control.Feedback type="invalid">
                Proszę wprowadzić poprawny numer telefonu.
              </Form.Control.Feedback>}
            </Form.Group>
            <Form.Text className="text-muted">
              Wymagamy tych danych tylko w celu realizacji zamówienia. Możemy skontaktować się z Tobą
              telefonicznie w przypadku problemów z realizacją zamówienia, takich jak brak określonych składników
              lub błędnie wprowadzonych danych do formularza.
              Jeśli chcesz, aby te dane były uzupełnianie automatycznie w kolejnych zamówieniach, załóż konto.
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Dostawa?" checked={isDelivery}
                          onChange={(e) => handleSetIsDelivery(e)}/>

            </Form.Group>
            { isDelivery && <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Adres dostawy*</Form.Label>
              <Form.Control type="text" placeholder="Podaj adres" value={address1}
                            onChange={(e) => handleSetAddress1(e)}
                            isInvalid={invalidAddress}/>
              {invalidAddress && <Form.Control.Feedback type="invalid">
                Proszę wprowadzić adres lub zrezygnować z dostawy.
              </Form.Control.Feedback>}
              <Form.Label>Adres dostawy 2(opcjonalne)</Form.Label>
              <Form.Control type="text" placeholder="Uzupełnij adres(opcjonalne)" value={address2}
                            onChange={(e) => setAddress2(e.target.value)}/>
              <Form.Text className="text-muted">
                Dostawa tylko w obszarze całego miasta Kraków. Podanie adresu spoza granic miasta Kraków będzie
                skutkowało unieważnieniem zamówienia. Adres nie będzie sprawdzany przez system, tylko przez nas.
              </Form.Text>
            </Form.Group>}
            <Button variant="primary" type="submit">
              Wyślij
            </Button>
          </Form>
        </div>
        <div className="order-ordered-pizzas-container">
          <p className="order-ordered-pizzas-title">Szczegóły zamówienia:</p>
          <ListGroup>
            {orderedPizzasMap!==null && <OrderedPizzasList orderedPizzasMap={orderedPizzasMap} data={order.data}/>}
          </ListGroup>
          {isLog && <p className="order-final-info-span"><span>Czy użyto kuponu: </span>{order.couponUsed ? <span><i>Tak</i></span> : <span><b>Nie</b></span>}</p>}
          <p className="order-final-info-span"><span>Ostateczna cena: </span><span><i>{order.totalPrice} zł</i></span></p>
        </div>
      </main>
    </div>
  );
  }
};

export default Order;
