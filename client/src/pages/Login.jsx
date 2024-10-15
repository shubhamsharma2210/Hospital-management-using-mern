import React, { useContext, useState } from "react";
import { context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { isAuthenticated, setAuthenticated } = useContext(context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/user/login",
        {email, password, confirmPassword, role: "Patient"},
        {
          withCredentials: true,
          headers: { "content-type": "application/json" },
        }
      )
      toast.success(response.data.message)
      setAuthenticated(true)
      navigate("/")
    } catch (error) {
        toast.error(error.response.data.message)
    }
  };
  if (isAuthenticated) {
    return navigate("/");
  }
  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please login to continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa earum
        voluptate ratione vel corporis. Autem.
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Enter the email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter the Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          value={confirmPassword}
          placeholder="Enter the Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not Register</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Resiter Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
