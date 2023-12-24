import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from "react-bootstrap/Button";
const TopNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"  className="my-height">
      <Container>
        <Navbar.Brand as={Link} to="/">Pizzeria pieczarka</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
            <Nav.Link as={Link} to="/discounts">Zniżki</Nav.Link>
            <Nav.Link as={Link} to="/about">O nas</Nav.Link>
            <Nav.Link as={Link} to="/contact">Kontakt</Nav.Link>
            <Nav.Link as={Link} to="/basket">Koszyk</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">
              <Button variant="primary">Zaloguj się</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/registration">
              <Button variant="primary">Zarejestruj się</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
};

export default TopNavbar;
