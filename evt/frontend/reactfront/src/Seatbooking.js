import React from "react";
import { useNavigate } from "react-router-dom";
import "./Seatbooking.css";
import logo from "./logo.svg"; // Update with your actual EVT logo path

const Seatbooking = () => {
  const navigate = useNavigate();

  return (
    <div className="seatbooking-container">
      {/* Header Section */}
      <header className="seatbooking-header">
        <img src={logo} alt="EVT Logo" className="seatbooking-logo" />
        <button className="history-button" onClick={() => navigate("/history")}>
          ประวัติการจอง
        </button>
      </header>

      {/* Form Section */}
      <div className="seatbooking-form">
        <div className="seatbooking-input-group">
          <label className="seatbooking-label">โรงงาน (Factory)</label>
          <input className="seatbooking-input" type="text" placeholder="โปรดเลือกโรงงานปลายทาง" />
        </div>

        <div className="seatbooking-input-group">
          <label className="seatbooking-label">กะ (Time Shift)</label>
          <input className="seatbooking-input" type="text" placeholder="โปรดเลือกเวลากะการทำงาน" />
        </div>

        <div className="seatbooking-input-group">
          <label className="seatbooking-label">สายรถ (Route)</label>
          <input className="seatbooking-input" type="text" placeholder="โปรดเลือกสายรถ" />
        </div>

        <div className="seatbooking-input-group">
          <label className="seatbooking-label">ป้าย (Pick up station)</label>
          <input className="seatbooking-input" type="text" placeholder="โปรดเลือกป้ายรถ" />
        </div>

        {/* Booking Button */}
        <div className="seatbooking-button-wrapper">
          <button className="seatbooking-button">จอง</button>
        </div>
      </div>
    </div>
  );
};

export default Seatbooking;
