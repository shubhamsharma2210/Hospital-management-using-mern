import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SideBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const gotHome = () => {
    navigate("/");
    setShow(!show);
  };
  const gotoDoctorPage = () => {
    navigate("/doctor");
    setShow(!show);
  };
  const gotoMessagePage = () => {
    navigate("/message");
    setShow(!show);
  };
  const gotoAddNewDoctorPage = () => {
    navigate("/addnewdoctor");
    setShow(!show);
  };
  const gotoAddNewAdminPage = () => {
    navigate("/addnewadmin");
    setShow(!show);
  };
  const handleLogout = async () => {
    await axios
      .get("http://localhost:4001/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        localStorage.clear();
        
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotHome} />
          <span>Home</span>
          
          <AiFillMessage onClick={gotoMessagePage} />
          <span>Message</span>
          <FaUserDoctor onClick={gotoDoctorPage} />
          <span>Doctor</span>
          <MdAddModerator onClick={gotoAddNewAdminPage} />
          <span>Add Admin</span>
          <IoPersonAddSharp onClick={gotoAddNewDoctorPage} />
          <span>Add Doctor</span>
          <RiLogoutBoxFill onClick={handleLogout} />
          <span>Logout</span>
        </div>
      </nav>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default SideBar;
