export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken(); // Fix: Call the function to generate the token
  console.log(token)
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // Fix: 'expires' was misspelled
      ),
      httpOnly: true, // Makes the cookie inaccessible to client-side scripts for security
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
