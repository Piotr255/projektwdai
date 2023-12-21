import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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

function App() {
  return (
    <div className="container">
      <Router>
        <TopNavbar /> {/* To musi być wewnątrz Router, żeby można było wewnątrz tego komponentu tworzyć Linki */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/menu" element={<Menu />}></Route>
          <Route path="/discounts" element={<Discounts />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/basket" element={<Basket />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
