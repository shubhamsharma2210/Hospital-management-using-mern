import { Appointment } from "../model/appointment.model.js";
import { User } from "../model/userSchema.model.js";

// Post appointment controller

export const postAppointment = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisted,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
   
    !address
  ) {
    return res.status(500).json({
      success: false,
      message: "Please fill the appointment form",
    });
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    res.status(400).json({
      success: false,
      message: "Doctor not found",
    });
  }
  if (isConflict.length > 1) {
    res.status(400).json({
      success: false,
      message: "Doctor conflict! please contact through email",
    });
  }
   const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },

    hasVisted,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    message: "Appointment sent successfully",
    appointment
  });
};



// get all appointment

export const getAllAppointment = async(req,res) => {
    const getAppointment = await Appointment.find()
    res.status(200).json({
        success: true,
        getAppointment
    })
}



// update appointment status

export const updateAppointmentStatus = async(req,res) => {
    const {id} = req.params

    let appointment = await Appointment.findById(id)
    if(!appointment){
      return  res.status(404).json({
            success: false,
            message: "Appointment not found"
        })
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new : true,
        runValidators: true,
        useFindAndModify: false

    })
    res.status(200).json({
        success: true,
        message: "Appointment Updated Successfully!",
        appointment
    })
}


// Delete appointment

export const deleteAppointment = async(req,res) => {
    const{id} = req.params
    let appointment = await Appointment.findById(id)
    if(!appointment){
        return res.status(404).json({
            success: false,
            message: "Appointment not found"
        })
    }
    appointment = await Appointment.deleteOne()
    res.status(200).json({
        success: true,
        message: "Appointment delete Successfully"
    })
}