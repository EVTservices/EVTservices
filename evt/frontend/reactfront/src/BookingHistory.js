import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingHistory.css";
import logo from "./logo.svg"; // Use your actual logo path
import absentIcon from "./absent.svg";
import onbusIcon from "./onbus.svg";
import { useCookies } from 'react-cookie'

const BookingHistory = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const token = cookies.token;


  useEffect(() => {
    const userId = localStorage.getItem("user_id"); // You must save this after login
    if (!userId || !token) return;

    axios
      .get(`http://localhost:5001/api/reservations/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setReservations(res.data.reservations || []);
      })
      .catch((err) => {
        console.error("Error fetching booking history:", err);
      });
  }, [token]);

  const getStatusIcon = (status) => {
    return status === "Confirmed" ? onbusIcon : absentIcon;
  };

  const getStatusColor = (status) => {
    return status === "Confirmed" ? "green" : "red";
  };

  return (
    <div className="history-container">
      <header className="history-header">
        <img src={logo} alt="EVT Logo" className="history-logo" />
        <button className="book-button" onClick={() => navigate("/seatbooking")}>
          จองที่นั่ง
        </button>
      </header>

      <div className="history-title">ประวัติการจอง (Booking History)</div>

      <div className="booking-list">
        {reservations.length === 0 ? (
          <p style={{ padding: "0 20px", color: "#888" }}>ยังไม่มีการจอง</p>
        ) : (
          reservations.map((r) => (
            <div className="booking-card" key={r.reservation_id}>
              <div className="booking-info">
                <div>สาย: {r.Route?.route_name || "-"}</div>
                <div>ป้าย: {r.Stop?.stop_name || "-"}</div>
                <div>รถ: {r.Bus?.bus_number || "-"}</div>
              </div>
              <div className="booking-status">
                <img
                  src={getStatusIcon(r.status)}
                  alt={r.status}
                  className="status-icon-img"
                />
                <span className={`status-text ${getStatusColor(r.status)}`}>
                  {r.status}
                </span>
              </div>
              <div className="booking-date">
                {new Date(r.booking_time).toLocaleString("th-TH", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;


