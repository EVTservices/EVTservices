import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./logo.svg"; // Replace with your actual EVT logo path

const Login = () => {
    const navigate = useNavigate();

  return (
    <div className="login-container">
      <img src={logo} alt="EVT Logo" className="logo" />
      <div className="form">
        <div className="input-group">
          <label>เบอร์โทรศัพท์</label>
          <input type="text" placeholder="โปรดกรอกเบอร์โทรศัพท์" />
        </div>

        <div className="input-group">
          <label>รหัสผ่าน</label>
          <input type="password" placeholder="โปรดกรอกรหัสผ่าน" />
        </div>

        <div className="button-wrapper">
          <button className="login-button" onClick={() => navigate("/menu")}>เข้าสู่ระบบ</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
