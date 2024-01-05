import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
const Home = () => {
  return (
    <div className="home-button-container">
      <h1 className="home-header">Witaj w naszej pizzerii!</h1>
      <Link to="/menu"><Button variant="success" className="home-button">Przejdź do menu</Button></Link>
    </div>
  );
};

export default Home;
