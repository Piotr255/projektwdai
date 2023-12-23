import React from 'react';
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <nav className="top-nav">
      <div className="logo">
        <img src="/img/Logo.png" alt="Logo" id="logo-img"/>
      </div>
      <div className="main-top-navbar flex-vertical-center">
        <Link to="/" className="top-nav-item">Start</Link>
        <Link to="/menu" className="top-nav-item">Menu</Link>
        <Link to="/about" className="top-nav-item">O nas</Link>
        <Link to="/contact" className="top-nav-item">Kontakt</Link>
        <Link to="/discounts" className="top-nav-item">Twój profil</Link>
      </div>
      <div className="top-nav-basket flex-vertical-center">
        <Link to="/basket"><img src="/img/Trolley.png" alt="Trolley" id="trolley-img"/></Link>
      </div>
      <div className="top-nav-login-section flex-vertical-center">
        <p>
          <Link to="/login"><button className="top-nav-login-button btn btn-success">Zaloguj się</button></Link>
        </p>
      </div>
    </nav>
  );
};

export default TopNavbar;
