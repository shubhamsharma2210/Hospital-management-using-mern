import { User } from "../model/userSchema.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";
import { generateToken } from "../utils/jwtToken.js";
import clodinary from "cloudinary";

// patient register login
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

// patient login

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

// Admin register controller
export const adminRegister = async (req, res) => {
  const { firstName, lastName, email, gender, dob, nic, phone, password } =
    req.body;
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

  const isregistred = await User.findOne({ email });
  if (isregistred) {
    return res.status(400).json({
      success: false,
      message: "Allready user registred",
    });
  }
  const admin = await User.create({
    firstName,
    lastName,
    dob,
    nic,
    phone,
    gender,
    email,
    password,
    role: "Admin",
  });
  res.status(201).json({
    success: true,
    message: "Admin register successfully",
  });
};

// get all doctor controller
export const getAllDoctors = async (req, res) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    message: "All doctors list",
    doctors,
  });
};

// get user details controller
export const getUserDetails = async (req, res, next) => {
  const users = req.user;

  if (!users) {
    return res.status(404).json({
      success: false,
      message: "Authenticated user not found",
    });
  }

  res.status(200).json({
    success: true,
    users,
  });
};

//admin logout controller
export const logoutAdmin = (req, res) => {
  res
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logout successfully",
    });
};

// patient logout controller
export const patientLogout = catchAsyncError(async (req, res) => {
  // Clear only the admin token from the cookies
  res
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()), // Expire the cookie to clear it
    })
    .json({
      success: true,
      message: "Patient logged out successfully",
    });
});

export const addNewDoctor = (async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      res.status(400).json({
        success: false,
        message: "Doctor Avtar is required",
      })
    );
  }
  const { docAvatar } = req.files;


  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "File format is not supported",
    });
  }

  const {
    firstName,
    lastName,
    email,
    gender,
    dob,
    nic,
    doctorDepartment,
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
    !doctorDepartment ||
    !phone ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill the full doctor form",
    });
  }
  const isregistred = await User.findOne({ email });
  if (isregistred) {
    return res.status(400).json({
      success: false,
      message: "Doctor is already registered",
    });
  }
  const cloudinaryResponse = await clodinary.v2.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error",
      cloudinaryResponse.error || "unknown cloudinary error"
    );
  }
    const user = await User.create({
      firstName,
      lastName,
      email,
      gender,
      dob,
      nic,
      doctorDepartment,
      phone,
      password,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      }
    })
    res.status(200).json({
      success: true,
      message: "Doctor Registered successfully"
    })
});


// count doctor 

export const doctorCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "Doctor" });
    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get doctor count",
    });
    console.log("Error in doctorCount controller:", error.message);
  }
};