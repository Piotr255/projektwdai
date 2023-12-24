import React, {useEffect, useState} from 'react';
import MenuList from "./MenuList";
import useFetch from "./useFetch";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
let discountsContainer;
let discountsTextContents;
let showDiscountsParagraph;
let discountInfo;
const Menu = () => {
  const {data, isPending, error} = useFetch("http://localhost:5000/pizzas");
  const {data: discounts, isPending: isDiscountsPending, error: discountsError} = useFetch("http://127.0.0.1:5000/discounts");
  const [pizzas, setPizzas] = useState(null);
  const [orderedPizzas, setOrder] = useState(new Map());
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithoutDiscounts, setTotalPriceWithoutDiscounts] = useState(0);

  useEffect(() => {
    discountsContainer = document.querySelector('.discounts-container');
    discountsTextContents = document.querySelectorAll('.text-content');
    showDiscountsParagraph = document.querySelector('.see-discounts-p');
  }, []);

  useEffect(() => {
    if (discounts){
      for (const discountsObj of discounts){
        if (discountsObj.active){
          discountInfo = [discountsObj.type,discountsObj.discount];
          break;
        }
      }
    }
  }, [discounts]);


  const handleCloseBasket = () => setShow(false);
  const handleShowBasket = () => {
    setShow(true);
  }
  useEffect(() => {
    if (data!==null) {
      setPizzas(data);
    }
  }, [data]);

  useEffect(() => {
    if (orderedPizzas.size === 0){
      document.querySelector('#basket-button').disabled=true;
    }
    else{
      document.querySelector('#basket-button').disabled=false;
    }
  }, [orderedPizzas]);


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

  const orderedPizzaCount = () => {
    let pizzaCount = 0;
    Array.from(orderedPizzas).map(([id, amount]) => {
      pizzaCount += amount;
    })
    console.log(pizzaCount);
    return pizzaCount;
  }

  useEffect(() => {
    let totalDiscount= 0;
    if (discounts){
      if (discountInfo[0] === 'casual2' && orderedPizzaCount() >= 2){
        let lowestPrice = 100;
        Array.from(orderedPizzas).map(([id, amount]) => {
          if (data[id].price < lowestPrice){
            lowestPrice = data[id].price;
          }
        })
        totalDiscount = discountInfo[1]/100*lowestPrice;
        console.log(totalDiscount);
      }
      let totalWithoutDiscounts = 0;
      orderedPizzas.forEach((amount, id) => {
        totalWithoutDiscounts += pizzas[id].price*amount;
      })
      setTotalPriceWithoutDiscounts(totalWithoutDiscounts.toFixed(2));
      setTotalPrice((totalWithoutDiscounts-totalDiscount).toFixed(2));
    }
  }, [orderedPizzas, discounts]);

  const handleClick = (e, key) => {
    const orderCopy = new Map(orderedPizzas);
    const currentCount = orderCopy.get(key) || 0;
    orderCopy.set(key, currentCount + 1);
    setOrder(orderCopy);
  }

  const handleSubtractClick = (e, key) => {
    const orderCopy = new Map(orderedPizzas);
    const currentCount = orderCopy.get(key) || 0;
    if (currentCount > 0){
      orderCopy.set(key, currentCount - 1);
      if (orderCopy.get(key)===0){
        orderCopy.delete(key);
      }
      setOrder(orderCopy);
    }

  }

  const handleBasketClickPlus = (e, id) => {
    const orderCopy = new Map(orderedPizzas);
    const currentCount = orderCopy.get(id);
    orderCopy.set(id, currentCount + 1);
    setOrder(orderCopy);
  }

  const handleBasketClickMinus = (e, id) => {
    const orderCopy = new Map(orderedPizzas);
    const currentCount = orderCopy.get(id);
    if (currentCount > 0){
      orderCopy.set(id, currentCount - 1);
      if (orderCopy.get(id)===0){
        orderCopy.delete(id);
      }
      setOrder(orderCopy);
    }

  }

  const afterShowDiscountsAnim = (e) => {
    if (e.animationName === 'showDiscounts'){
      discountsContainer.classList.remove("show-discounts");
      discountsContainer.classList.add("after-show-discounts");
      discountsTextContents.forEach((element) => {
        element.style.display = "block";
      })
    }
    else if (e.animationName === 'hideDiscounts'){
      discountsContainer.classList.remove("hide-discounts");
      discountsContainer.classList.add("after-hide-discounts");
    }
  }

  const handleShowOrHideDiscounts = () => {
    if (discountsContainer.classList.contains("after-hide-discounts")){
      discountsContainer.classList.remove("after-hide-discounts");
      discountsContainer.classList.add("show-discounts");
      showDiscountsParagraph.innerHTML="Schowaj aktualne promocje";
    }
    else if (discountsContainer.classList.contains("after-show-discounts")){
      showDiscountsParagraph.innerHTML="Zobacz aktualne promocje &#x25BC;";
      discountsTextContents.forEach((element) => {
        element.style.display = "none";
      })
      discountsContainer.classList.remove("after-show-discounts")
      discountsContainer.classList.add("hide-discounts");
    }

  }

  return (
    <div className="menu-container">
      <div className="see-discounts">
        <p className="see-discounts-p" id="see-discounts-trigger" onClick={handleShowOrHideDiscounts}>
          Zobacz aktualne promocje &#x25BC;
        </p>
        <div className="discounts-container after-hide-discounts" onAnimationEnd={(e) => afterShowDiscountsAnim(e)}>
          <div className="discount-container" id="discount-container-1">
            <div className="text-content">
              <span>Kup 2 pizze lub więcej, aby otrzymać zniżkę 20% na najtańszą z nich!</span>
            </div>
          </div>
          <div className="discount-container" id="discount-container-2">
            <div className="text-content">
              <span>Aby otrzymać darmową pizzę, musisz zamówić jeszcze: </span>
              <br />
              <span className="discount-condition">[Tylko dla zalogowanych użytkowników]</span>
            </div>
          </div>
        </div>
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
        <MenuList pizzas={pizzas} isPending={isPending} error={error} on_element_click={handleClick} order={orderedPizzas} on_element_subtract_click={handleSubtractClick}/>
      </div>
      <div id="basket-container">
        <div className="basket-button-container">
          <Button className="btn btn-dark bigger-button" id="basket-button" onClick={handleShowBasket}>Koszyk</Button>
        </div>
      </div>
      {/* Poniżej koszyk wyświetlany jako popup*/}

      <>
        <Modal show={show} onHide={handleCloseBasket}>
          <Modal.Header closeButton>
            <Modal.Title>Twój koszyk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Array.from(orderedPizzas).map(([id,amount]) => (
              amount>0 &&
              <div className="basket-element">
                <p className="basket-info-container inline-block">
                  <span className="basket-element-pizza-name">{data[id].name}</span>
                  <span className="basket-element-pizza-amount">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{amount} x {data[id].price} zł</span>
                </p>
                <p className="basket-changer-container inline-block">
                  <Button className="basket-increase-count basket-count-changer btn-info" onClick={(e) => handleBasketClickPlus(e, id)}>+</Button>
                  <Button className="basket-decrease-count basket-count-changer btn-info" onClick={(e) => handleBasketClickMinus(e, id)}>-</Button>
                </p>
              </div>

            ))}
            <p className="basket-total-price-p">Razem: {totalPrice !== totalPriceWithoutDiscounts && <del>{totalPriceWithoutDiscounts}</del>} {totalPrice} zł</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseBasket}>
              Zamknij
            </Button>
            <Button variant="success" onClick={handleCloseBasket}>
              Płatność
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Menu;
