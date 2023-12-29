import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import TopNavbar from "./TopNavbar";
import Home from "./Home";
import Menu from "./Menu";
import Discounts from "./Discounts";
import About from "./About";
import Contact from "./Contact";
import Basket from "./Basket";
import Login from "./Login";
import Registration from "./Registration";
import Profile from "./Profile";
import withAuth from "./withAuth"
import Footer from "./Footer";
import Order from "./Order";
import CouponNotification from "./CouponsNotification";
import {useState} from "react";
import AuthProvider from "./AuthProvider";

function App() {
  return (
    <div className="my-container">
      <AuthProvider>
      <Router>
        <TopNavbar />
        <CouponNotification />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/discounts" element={<Discounts />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/basket" element={<Basket />}></Route>
          <Route path="/profile" element={withAuth(Profile)()} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/order" element={<Order />}></Route>
        </Routes>
        <Footer />
      </Router>
      </AuthProvider>
    </div>

  );
}

export default App;
