export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken
    const cookieName = user.role === 'Admin' ? 'Admin Token' : "patient Token"
    res.status(statusCode).cookie(cookieName, token, {
        expries: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 *60 *1000) 
    }).json({
        success : true,
        message,
        token,
        user
    })
}