import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const Doctor = () => {
  const { isAuthenticated } = useContext(Context);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/api/v1/user/doctors/list", {
          withCredentials: true,
        });
        
        // Verify that the data contains a 'doctors' array
        if (data && data.doctors) {
          setDoctors(data.doctors);
        } else {
          throw new Error("Unexpected data format from API");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch doctors. Please try again."
        );
      }
    };

    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
   <section className="page doctors">
    <h1>Doctors</h1>
    <div className="banner">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div className="card" key={doctor._id}>
            <img
              src={doctor.docAvatar?.url || "placeholder.jpg"}
              alt="Doctor Avatar"
              onError={(e) => { e.target.src = "placeholder.jpg"; }}
            />
            <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
            <div className="details">
              <p>Email: <span>{doctor.email}</span></p>
              <p>Phone: <span>{doctor.phone}</span></p>
              <p>NIC: <span>{doctor.nic}</span></p>
              <p>DOB: <span>{doctor.dob.substring(0,10)}</span></p>
              <p>Doctor <span>Department: {doctor.doctorDepartment}</span></p>
            </div>
          </div>
        ))
      ) : (
        <h1>No Doctors Found</h1>
      )}
    </div>
   </section>
  );
};

export default Doctor;
