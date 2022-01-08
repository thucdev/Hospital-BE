import jwt from 'jsonwebtoken'
require('dotenv').config()

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(' ')[1]
            await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ errCode: 1, message: 'Token is not valid' })
                }
                req.user = user
            })
            next()
        } else {
            return res.status(401).json({ errCode: 1, message: 'You are not authenticated' })
        }
    } catch (error) {
        console.log('', error)
    }
}

const checkAdmin = (req, res, next) => {
    verifyToken()
}

module.exports = { verifyToken }
// export default verifyToken
