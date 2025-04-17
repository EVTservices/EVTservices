import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookingSuccess.css";
import logo from "./logo.svg"; // Adjust path if needed
import checkedIcon from "./checked.svg"; 

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="booking-success-container">
      <header className="booking-success-header">
        <img src={logo} alt="EVT Logo" className="booking-logo" />
        <div className="booking-nav-buttons">
          <button onClick={() => navigate("/menu")}>เมนูหลัก</button>
        </div>
      </header>

      <div className="booking-success-content">
        <img src={checkedIcon} alt="Success" className="success-icon" />
        <h2>ขอบคุณ!<br />ยืนยันการจองสำเร็จ</h2>
        <p>ท่านสามารถตรวจสอบรายละเอียดการจองผ่านข้อความทาง LineOA</p>
      </div>
    </div>
  );
};

export default BookingSuccess;

