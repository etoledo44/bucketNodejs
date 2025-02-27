const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function generateToken(payload) {
    const expiresIn = '5h'
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn })
    return token
}
module.exports = { generateToken }