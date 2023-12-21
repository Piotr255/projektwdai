import React from 'react';
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <nav className="top-nav">
      <div className="logo">
        <img src="/img/Logo.png" alt="Logo" height="150px" id="logo-img"/>
      </div>
      <div className="main-top-navbar flex-vertical-center">
        <Link to="/"><span id="start" className="top-nav-item">Start</span></Link>
        <Link to="/menu"><span id="menu" className="top-nav-item">Menu</span></Link>
        <Link to="/discounts"><span id="discounts" className="top-nav-item">Promocje</span></Link>
        <Link to="/about"><span id="gallery" className="top-nav-item">O nas</span></Link>
        <Link to="/contact"><span id="contact" className="top-nav-item">Kontakt</span></Link>
      </div>
      <div className="top-nav-basket flex-vertical-center">
        <Link to="/basket"><img src="/img/Trolley.png" alt="Trolley" height="50px" id="trolley-img"/></Link>
      </div>
      <div className="top-nav-login-section flex-vertical-center">
        <p>
          <Link to="/login"><span className="top-nav-login-span">Zaloguj się</span></Link>
          <br />
          <br />
          <Link to="/registration"><span className="top-nav-login-span">Załóż bezpłatne konto</span></Link>
        </p>
      </div>
    </nav>
  );
};

export default TopNavbar;
