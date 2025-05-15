import React from "react";
import logo from "./logo.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [cookies, , removeCookie] = useCookies(["token", "user_id"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) return;
    try {
      await axios.post("http://localhost:5001/api/auth/logout", {}, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });

      removeCookie("token", { path: "/" });
      removeCookie("user_id", { path: "/" });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="header">
      <img src={logo} alt="EVT Logo" className="header-logo" />
      <button className="logout-button" onClick={handleLogout}>ออกจากระบบ</button>
      <button className="menu-button" onClick={() => navigate("/menu")}>เมนูหลัก</button>
        
    </div>
  );
};

export default Header;
