import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/v1/appointment/getall",
          { withCredentials: true }
        );

        setAppointments(data.getAppointment);
      } catch (error) {
        setAppointments([]);
        console.log("error in dashboard api", error);
      }
    };
    fetchAppointment();
  }, []);

  // update status
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/v1/appointment/updatestatus/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // doctor Count
  const [doctorCount, setDoctorCount] = useState(0);
  const fetchDoctorCount = async () => {
    const { data } = await axios.get(
      "http://localhost:4001/api/v1/user/doctor/count",
      { withCredentials: true }
    );

    setDoctorCount(data.count);
  };
  fetchDoctorCount();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="Doc image" />
            <div className="content">
              <div>
                <p>Hello, </p>
                <h4 style={{ color: "red" }}>
                  {user && `${user.firstName} ${user.lastName}`}
                </h4>
              </div>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Doloribus, placeat?
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p style={{ color: "black" }}>Total appointment</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Total Doctor Register</p>
            <h3>{doctorCount}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 10)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-panding"
                              : appointment.status === "Rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option className="value-pending" value="Pending">
                            Pending
                          </option>
                          <option className="value-accepted" value="Accepted">
                            Accepted
                          </option>
                          <option className="value-rejected" value="Rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisted === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}{" "}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
