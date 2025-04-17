import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Menu from "./Menu";
import Seatbooking from "./Seatbooking";
import BookingSuccess from "./BookingSuccess";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />  {/* Default Login Page */}
        <Route path="/menu" element={<Menu />} /> {/* Menu Page */}
        <Route path="/Seatbooking" element={<Seatbooking />} /> {/* Menu Page */}
        <Route path="/success" element={<BookingSuccess />} />
        

      </Routes>
    </Router>
  );
}

export default App;
