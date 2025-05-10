import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "./logo.svg"; // Replace with your actual EVT logo path
import { useCookies } from 'react-cookie'

const Login = () => {
  const navigate = useNavigate();

  // State for input fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(['token','user_id'])

  // Function to handle login API call
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        phone_number: phoneNumber,
        password: password,
      });

      const token = response.data.token; // Get JWT token from response

      // Store token in localStorage
      //localStorage.setItem("token", token);
  
      
      setCookie('token', token);     
      console.log(response.data);

      // Redirect to Menu page
      navigate("/menu");
    } catch (err) {
      setError("เบอร์โทรศัพท์หรือรหัสผ่านผิดพลาด กรุณากรอกข้อมูลอีกครั้ง");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="EVT Logo" className="logo" />

      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-input-group">
          <label className="login-label">เบอร์โทรศัพท์</label>
          <input
            className="login-input"
            type="text"
            placeholder="โปรดกรอกเบอร์โทรศัพท์"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">รหัสผ่าน</label>
          <input
            className="login-input"
            type="password"
            placeholder="โปรดกรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <div className="login-button-wrapper">
          <button className="login-button" type="submit">
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

