import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import TopNavbar from "./TopNavbar";
import Home from "./Home";
import Menu from "./Menu";
import Gallery from "./Gallery";
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
import OrderProvider from "./OrderProvider";
import LocationValidator from "./LocationValidator";
import ProcessOrder from "./ProcessOrder";
function App() {
  return (
    <div className="my-container">
      <AuthProvider>
        <Router>
          <LocationValidator />
          <TopNavbar />
          <CouponNotification />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/menu" element={<Menu />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/basket" element={<Basket />}></Route>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/process_order" element={<ProcessOrder />}></Route>
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>

  );
}

export default App;
