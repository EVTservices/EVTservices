import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingHistory.css";
import logo from "./logo.svg";
import onbusIcon from "./onbus.svg";
import WaitingForCheckinIcon from "./WaitingForCheckin.svg";
import { useCookies } from 'react-cookie';

const BookingHistory = () => {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token', 'user_id']);
  const token = cookies.token;

  const cancelReservation = async (reservationId) => {
    if (!token) return;
  
    try {
      await axios.delete(`http://localhost:5001/api/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setReservations(prev => prev.filter(r => r.reservation_id !== reservationId));
    } catch (err) {
      console.error("Failed to cancel reservation:", err);
    }
  };

  useEffect(() => {
    const userId = cookies.user_id;
    if (!userId || !token) return;

    axios.get(`http://localhost:5001/api/reservations/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setReservations(res.data.reservations || []);
    })
    .catch((err) => {
      console.error("Error fetching booking history:", err);
    });
  }, [token]);

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
          <p className="no-booking">ยังไม่มีการจอง</p>
        ) : (
          reservations.map((r) => (
            <div className="booking-card" key={r.reservation_id}>
              <div className="left-info">
                <div className="booking-date">
                  {new Date(r.booking_time).toLocaleDateString("th-TH", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </div>
                <div className="booking-detail">
                  <div>ปลายทาง: {r.Factory?.name || "-"}</div>
                  <div>สาย: {r.Route?.route_name || "-"}</div>
                  <div>ป้ายขึ้น: {r.Stop?.name || "-"}</div>
                </div>
              </div>

            <div className="right-status">
              {r.check_in_status ? (
                <div className="status-group">
                  <img src={onbusIcon} alt="ขึ้นรถแล้ว" className="status-icon-img" />
                  <span className="status-text green">เช็คอินเรียบร้อย</span>
                </div>
              ) : (
                <div className="status-group">
                  <img src={WaitingForCheckinIcon} alt="รอการเช็คอิน" className="status-icon-img" />
                  <span className="status-text gray">รอการเช็คอิน</span>
                  {r.status !== "Cancelled" && (
                    <>
                      <button className="cancelled-button" onClick={() => cancelReservation(r.reservation_id)}>ยกเลิกการจอง</button>
                      {r.status === "Waitlist" && <div className="waitlist-note">**อยู่ในคิว**</div>}
                    </>
                  )}
                </div>
              )}
            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;





