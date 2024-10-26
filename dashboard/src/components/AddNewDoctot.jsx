import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import DefaultAvatar from "../../public/docHolder.jpg";

const AddNewDoctot = () => {
  const { isAuthenticated, setAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState({});
  const [email, setEmail] = useState({});
  const [lastName, setLastName] = useState({});
  const [phone, setPhone] = useState({});
  const [nic, setNic] = useState({});
  const [dob, setDob] = useState({});
  const [password, setPassword] = useState({});
  const [gender, setGender] = useState({});
  const [doctorDepartment, setDoctorDepartment] = useState({});
  const [docAvatar, setDocAvatar] = useState({});
  const [doctorAvatarPreview, setDoctorAvatarPreview] = useState({});

  // department Array
  const departmentArray = [
    "Pediatrics",
    "Cardiology",
    "Derma",
    "Dentist",
    "Neuro",
    "Oncology",
    "Orthology",
    "Radiology",
    "Therapy",
  ];

  // handle Avatar Function
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDoctorAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const navigateTo = useNavigate();
  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const fromData = new FormData();
      fromData.append("firstName", firstName);
      fromData.append("lastName", lastName);
      fromData.append("email", email);
      fromData.append("phone", phone);
      fromData.append("nic", nic);
      fromData.append("dob", dob);
      fromData.append("gender", gender);
      fromData.append("password", password);
      fromData.append("doctorDepartment", doctorDepartment);
      fromData.append("docAvatar", docAvatar);

      const response = await axios.post(
        "http://localhost:4001/api/v1/user/doctor/addnew",
        fromData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/from-data",
          },
        }
      );
      toast.success(response.data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const gotoSuccessPage = () => {
    navigateTo("/success-page");
  };
  return (
    <>
      <div className="page">
        <div className="container form-component add-doctor-form">
          <h2>ADD DOCTOR</h2>
          <p>Please Add A New Doctor</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nostrum expedita tenetur vel soluta neque.
          </p>
          <form onSubmit={handleAddNewDoctor}>
            <div className="first-wrapper">
              <div>
                <img
                  src={
                    doctorAvatarPreview
                      ? `${doctorAvatarPreview}`
                      : { DefaultAvatar }
                  }
                  alt="doctor Avatar"
                />
                

                
              </div>
              <div>
              <input type="file" onChange={handleAvatar} />
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
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value=""> Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select value={doctorDepartment} onChange={(e) => setDoctorDepartment(e.target.value)}>
                  <option value="Select Department">Select Department</option>
                 
                    {
                      departmentArray.map((depart,index) => {
                        return (
                          <option value={depart} key={index}>{depart}</option>
                        )
                      })
                    }
                  
                </select>
                <button  type="submit">
                Add Doctor
              </button>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewDoctot;
