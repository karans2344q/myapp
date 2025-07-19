import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

const LoginPage = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("⚠️ Please fill in all fields");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);

        // ✅ Pop-up show karo bina OK ke (auto dismiss after few seconds)
        const alertBox = document.createElement('div');
        alertBox.innerText = "✅ Login Successful!";
        alertBox.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4BB543;
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: bold;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          z-index: 9999;
        `;
        document.body.appendChild(alertBox);

        setTimeout(() => {
          document.body.removeChild(alertBox);

          // ✅ Role ke according navigate
          if (userData.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }, 1500); // Alert 1.5 seconds ke baad automatic redirect
      } else {
        alert("❌ User data not found!");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("❌ Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '15px' }}>
        <span>Not registered? </span>
        <a href="/register" style={{ color: '#7c43bd' }}>Register here</a>
      </div>
    </div>
  );
};

export default LoginPage;
