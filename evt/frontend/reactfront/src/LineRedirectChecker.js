import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const LineRedirectChecker = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const user = res.data;

        if (user.line_user_id) {
          navigate("/menu");
        } else {
          // Redirect to LINE login with user_id in state
          const clientId = "2007394575";
          const redirectUri = encodeURIComponent("https://3606-49-228-64-187.ngrok-free.app/api/line/callback");
          const state = user.user_id; // Send user_id to backend to link after login
          const scope = "profile openid";

          const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

          window.location.href = lineLoginUrl;
        }
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  }, [token, navigate]);

  return null; // no UI shown here
};

export default LineRedirectChecker;

