import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import "./Seatbooking.css";
import logo from "./logo.svg"; // Update with your actual EVT logo path

const Menu = () => {
    const navigate = useNavigate();

  return (
    <div className="menu-container">
      <img src={logo} alt="EVT Logo" className="menu-logo" />

      <div className="menu-buttons">
        <button className="menu-button" onClick={() => navigate("/seatbooking")}>จองที่นั่ง</button>
        <button className="menu-button" onClick={() => navigate("/bookinghistory")}>ประวัติการจอง</button>
      </div>
    </div>
  );
};

export default Menu;
