import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../main';

const AddNewAdmin = () => {
    const { isAuthenticated, setAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState({});
  const [email, setEmail] = useState({});
  const [lastName, setLastName] = useState({});
  const [phone, setPhone] = useState({});
  const [nic, setNic] = useState({});
  const [dob, setDob] = useState({});
  const [password, setPassword] = useState({});
  const [gender, setGender] = useState({});
  const navigateTo = useNavigate();
  const handleNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/v1/user/addnew",
        { firstName, lastName, email, nic, dob, phone, gender, password , role: "Admin"},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setAuthenticated(true);
      navigateTo('/')
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const gotoSuccessPage =() => {
    navigateTo('/success-page')
  }
  return (
    <>
        <div className="page">
        <div className="container form-component add-admin-form">
      <h2>Register Admin</h2>
      <p>Please Register The Admin</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nostrum
        expedita tenetur vel soluta neque.
      </p>
      <form onSubmit={handleNewAdmin}>
        <div>
          <input
            type="text"
            placeholder="Enter Your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter Your NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
          <input
            type="date"
            placeholder="Enter Your DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value=""> Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button onClick={gotoSuccessPage} type="submit">New Admin Register</button>
        </div>
      </form>
    </div>
        </div>
    </>
  )
}

export default AddNewAdmin