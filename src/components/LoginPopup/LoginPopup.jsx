import React, { useState } from "react";
import "./LoginPopup.css";
import { auth } from "../../config/firebase"; // Adjusted the import path
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    if (currentState === "Sign up") {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } catch (error) {
        console.error("Error creating account:", error);
        alert("Failed to create account.");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Failed to login.");
      }
    }
    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleAuth}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt="cross_icon"
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign up" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {currentState === "Sign up" ? "Create Account" : "Login"}
        </button>

        {currentState === "Sign up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        )}

        {currentState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
