// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Menu.css";
// import "./Seatbooking.css";
// import logo from "./logo.svg";
// import { useCookies } from "react-cookie";

// const Menu = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies(["token"]);
//   const [name, setName] = useState("-");
//   const [factoryName, setFactoryName] = useState("-");

//   useEffect(() => {
//     const token = cookies.token;
//     if (!token) return;

//     axios
//       .get("http://localhost:5001/api/user/profile", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setName(res.data.name || "-");
//         setFactoryName(res.data.factory_name || "-");
//       })
//       .catch((err) => {
//         console.error("Error fetching user profile:", err);
//       });
//   }, [cookies]);

//   const handleLogout = async () => {
//     if (!window.confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) return;
//     try {
//       await axios.post("http://localhost:5001/api/auth/logout", {}, {
//         headers: { Authorization: `Bearer ${cookies.token}` },
//       });

//       removeCookie("token", { path: "/" });
//       removeCookie("user_id", { path: "/" });
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div className="menu-container">
//       <img src={logo} alt="EVT Logo" className="menu-logo" />

//       <div className="menu-greeting">
//         <div className="greeting-line">ยินดีต้อนรับ!</div>
//         <div className="greeting-name">คุณ {name}</div>
//         <div className="greeting-factory">โรงงาน {factoryName}</div>
//       </div>

//       <div className="menu-buttons">
//         <button className="menu-button" onClick={() => navigate("/seatbooking")}>
//           จองที่นั่ง
//         </button>
//         <button className="menu-button" onClick={() => navigate("/bookinghistory")}>
//           ประวัติการจอง
//         </button>
//         <button className="menu-button" onClick={handleLogout}>
//           ออกจากระบบ
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Menu;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Menu.css";
import "./Seatbooking.css";
import logo from "./logo.svg";
import { useCookies } from "react-cookie";

const Menu = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user_id"]);
  const [name, setName] = useState("-");
  const [factoryName, setFactoryName] = useState("-");

  useEffect(() => {
    const token = cookies.token;
    if (!token) return;

    axios
      .get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const { name, factory_name, user_id } = res.data;

        setName(name || "-");
        setFactoryName(factory_name || "-");

        // ✅ Update the user_id cookie
        if (user_id) {
          setCookie("user_id", user_id, { path: "/" });
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, [cookies.token]); // Depend only on token to avoid re-trigger loops

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
    <div className="menu-container">
      <img src={logo} alt="EVT Logo" className="menu-logo" />

      <div className="menu-greeting">
        <div className="greeting-line">ยินดีต้อนรับ!</div>
        <div className="greeting-name">คุณ {name}</div>
        <div className="greeting-factory">โรงงาน {factoryName}</div>
      </div>

      <div className="menu-buttons">
        <button className="menu-button" onClick={() => navigate("/seatbooking")}>
          จองที่นั่ง
        </button>
        <button className="menu-button" onClick={() => navigate("/bookinghistory")}>
          ประวัติการจอง
        </button>
        <button className="menu-button" onClick={handleLogout}>
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Menu;
