import mongoose from 'mongoose'
import validator from 'validator'

const appointmentSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        minLength : [3, "First Name must contain at least 3 charachters"]
    },

    lastName : {
        type: String,
        required: true,
        minLength : [3, "First Name must contain at least 3 charachters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide A Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone number must contain Excat 10 digits"],
        maxLength: [10, "Phone number must contain Excat 10 digits"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [10, "NIC Must contain exact 11 digits"],
        maxLength: [10, "NIC Must contain exact 11 digits"],
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
   
    appointment_date : {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        firstName : {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    hasVisted: {
        type: Boolean,
        default: false
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending","Accepted", "Rejected"],
        default: "Pending"
    }
 


})

export const Appointment = mongoose.model('appointment', appointmentSchema) 