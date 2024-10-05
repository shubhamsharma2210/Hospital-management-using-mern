import { User } from "../model/userSchema.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    dob,
    nic,
    role,
    phone,
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !gender ||
    !dob ||
    !nic ||
    !role ||
    !phone ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill the full Registration form",
    });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      dob,
      nic,
      role,
      phone,
      password,
    });

    generateToken(user, "User Registered SuccessFully", 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong in user controller",
    });
    console.log("error occured in user controller", error.message);
  }
};

export const logIn = async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill the full form",
    });
  }
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirmPassword are not matched",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatchedPassword = await user.comparePassword(password);
    if (!isMatchedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password or email",
      });
    }
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "User with this role not found",
      });
    }
    generateToken(user, "Login SuccessFully", 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in login controller",
    });
    console.log("Something went wrong in login controller", error.message);
  }
};

export const adminRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    dob,
    nic,
    phone,
    
    password,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !gender ||
    !dob ||
    !nic ||
   
    !phone ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill the full Registration form",
    });
  }
  try {
    const isAlreadyAdminRegister = await User.findOne({ email });
    if (isAlreadyAdminRegister) {
      res.status(400).json({
        success: false,
        message: "Admin already register",
      });
      const admin = await User.create({
        firstName,
        lastName,
        email,
        gender,
        dob,
        nic,
        phone,
        password,
        role: "Admin",
      });
    return  res.status(200).json({
        success: true,
        message: "Admin Register suceessfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      admin,
      success: false,
      message: "something went wrong in admin controller",
    });
    console.log("something went wrong in admin controller", error.message);
  }
};
