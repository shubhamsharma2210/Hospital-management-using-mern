import React from "react";
import { Link } from "react-router-dom";


const AdminRegisterSuccess = () => {
  return (
    <div className="admin-register-success">
      <div className="success-box">
        <div className="success-icon">&#10004;</div> {/* Success checkmark icon */}
        <h1>Admin Registration Successful</h1>
        <h2>Thank you</h2>
        
        <p style={{marginTop: "5px"}}>The admin has been registered successfully.</p>
        <Link to={'/'} style={{textDecoration:"none", border: '1px solid green', background: "smokeWhite", borderRadius:"5px", marginTop: "10px", padding: "4px", margin: "4px"}}>Home page</Link>
      </div>
    </div>
  );
};

export default AdminRegisterSuccess;
