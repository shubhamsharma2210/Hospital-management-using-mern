import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing the green tick icon from react-icons
import { useNavigate } from 'react-router-dom';


const SendAppointmentSuccess = () => {
    const navigate = useNavigate()
    const handlebtn = () => {
        navigate('/')
    }
  return (
    <div className="success-container" style={{marginTop: "50px"}}>
      <FaCheckCircle className="success-icon" />
      <h2>Appointment Sent Successfully!</h2>
      <p>Your appointment has been successfully scheduled.</p>
      <button className='success-btn' onClick={handlebtn}>Back to home</button>
    </div>
  );
};

export default SendAppointmentSuccess;
