import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Seatbooking.css";
import logo from "./logo.svg"; // Replace with actual logo path

const Seatbooking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shift, setShift] = useState("");
  const [route, setRoute] = useState("");
  const [station, setStation] = useState("");

  const handleNext = () => {
    if (step === 1 && shift) setStep(2);
    else if (step === 2 && route) setStep(3);
    else if (step === 3 && station) {
      // Here’s the redirect to success page
      navigate("/success");
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
              <option value="morning">เช้า</option>
              <option value="afternoon">บ่าย</option>
              <option value="night">กลางคืน</option>
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
                <option value="1">สาย 1</option>
                <option value="2">สาย 2</option>
                <option value="3">สาย 3</option>
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
                <option value="a">ป้าย A</option>
                <option value="b">ป้าย B</option>
                <option value="c">ป้าย C</option>
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
