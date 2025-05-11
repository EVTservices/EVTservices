import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Seatbooking.css";
import logo from "./logo.svg"; // Replace with actual logo path
import { useCookies } from 'react-cookie'

const Seatbooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shift, setShift] = useState("");
  const [route, setRoute] = useState("");
  const [station, setStation] = useState("");

  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);

  const [cookies, setCookie] = useCookies(['token','user_id'])
  const token = cookies.token;

  useEffect(() => {
    if (step === 2 && shift) {
      axios
        .get(`http://localhost:5001/api/reservations/routes/my?shift=${shift}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRoutes(res.data))
        .catch((err) => console.error("Error fetching routes:", err));
    }
  }, [step, shift]);

  useEffect(() => {
    if (step === 3 && route) {
      axios
        .get(`http://localhost:5001/api/reservations/routes/${route}/stops`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStops(res.data))
        .catch((err) => console.error("Error fetching stops:", err));
    }
  }, [step, route]);

  const handleNext = () => {
    if (step === 1 && shift) setStep(2);
    else if (step === 2 && route) setStep(3);
    else if (step === 3 && station) {
      // Final reservation
      axios
        .post(
          "http://localhost:5001/api/reservations",
          {
            bus_id: 1, // Replace with actual logic if bus selection is needed
            route_id: route,
            stop_id: station,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => navigate("/success"))
        .catch((err) => console.error("Reservation error:", err));
    }
  };

  return (
    <div className="seatbooking-container">
      <header className="seatbooking-header">
        <img src={logo} alt="EVT Logo" className="seatbooking-logo" />
        <button className="backtomenu-button" onClick={() => navigate("/menu")}>
          เมนูหลัก
        </button>
      </header>

      <div className="step-indicator">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`step-circle ${step === s ? "active" : "inactive"}`}
          >
            {s}
          </div>
        ))}
      </div>

      <div className="seatbooking-form fade-in">
        {step === 1 && (
          <div className="seatbooking-input-group">
            <label className="seatbooking-label">กะ (Time Shift)</label>
            <select
              className="seatbooking-select"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="">โปรดเลือกเวลากะการทำงาน</option>
              <option value="Morning">เช้า</option>
              <option value="Afternoon">บ่าย</option>
              <option value="Night">กลางคืน</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="seatbooking-image-placeholder" />
            <div className="seatbooking-input-group">
              <label className="seatbooking-label">สายรถ (Route)</label>
              <select
                className="seatbooking-select"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
              >
                <option value="">โปรดเลือกสายรถ</option>
                {routes.map((r) => (
                  <option key={r.route_id} value={r.route_id}>
                    {r.route_name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="seatbooking-image-placeholder" />
            <div className="seatbooking-input-group">
              <label className="seatbooking-label">ป้าย (Pick up station)</label>
              <select
                className="seatbooking-select"
                value={station}
                onChange={(e) => setStation(e.target.value)}
              >
                <option value="">โปรดเลือกป้ายรถ</option>
                {stops.map((s) => (
                  <option key={s.stop_id} value={s.stop_id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="seatbooking-button-wrapper">
          <button
            className="seatbooking-button"
            onClick={handleNext}
            disabled={(step === 1 && !shift) || (step === 2 && !route) || (step === 3 && !station)}
          >
            {step === 3 ? "จองเลย" : "ถัดไป"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Seatbooking;

