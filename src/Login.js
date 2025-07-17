import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

const LoginPage = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields.");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Firestore se user details lena
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
        alert("✅ Login Successful!");
        navigate("/");
      } else {
        alert("❌ User data not found!");
      }

    } catch (error) {
      if (error.code === "auth/user-not-found") alert("No user found with this email.");
      else if (error.code === "auth/wrong-password") alert("Incorrect password.");
      else alert("❌ Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '18px' }}>
        <span>Not registered? </span>
        <a href="/register" style={{ color: '#7c43bd', fontWeight: 'bold' }}>Register here</a>
      </div>
    </div>
  );
};

export default LoginPage;
