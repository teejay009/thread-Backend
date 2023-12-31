const jwt = require('jsonwebtoken')

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie('jwt', token, {
        httpOnly: true, // more secure
        maxAge: 15 * 24 * 60 * 1000, // 15 days
        saneSite: "strict", // CXSRF
    })

    return token
}

module.exports = generateTokenAndSetCookie