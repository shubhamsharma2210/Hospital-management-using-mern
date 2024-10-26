import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = async() => {
   
     await axios
        .get("http://localhost:4001/api/v1/user/patient/logout", {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(false)
          setTimeout(() => {
            navigate('/login')
          },3000)
        })
        .catch((err) => toast.error(err.response.data.message));
    
  };
  return (
    <div>
      <nav className="container">
        <div className="logo">SHUBHCARE</div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"}>Home</Link>
            <Link to={"/appointment"}>Appointment</Link>
            <Link to={"/about"}>About Us</Link>
          </div>
          <div>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="logoutBtn btn">
                LOGOUT
              </button>
            ) : (
              <button onClick={handleLogin} className="loginBtn btn">
                LOGIN
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
