import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 character"]
    },
    role: {
        type: String,
        required: true,
        enum : ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
},{timestamps:true})

// hash password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password =await bcrypt.hash(this.password, 10)
})

// comare Password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

// generate Token
userSchema.methods.generateJsonWebToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
}


export const User = mongoose.model('user', userSchema)