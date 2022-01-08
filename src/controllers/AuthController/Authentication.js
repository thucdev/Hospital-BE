import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
require('dotenv').config()

import db from '../../models/index'

const register = async (req, res) => {
    const { email, password } = req.body
    if (!email || password)
        return res.status(400).json({ success: false, message: 'Missing email or password' })

    //check existing user
    const user = await db.User.findOne({
        where: { email: req.body.email },
        raw: true,
    })
    if (user) return res.status(400).json({ success: false, message: 'Email is already exist.' })

    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPW = bcrypt.hashSync(req.body.password, salt)

        //create user
        const newUser = await db.User.create({
            email: req.body.email,
            password: hashPW,
            // firstName: data.firstName,
            // lastName: data.lastName,
            // address: data.address,
            // phoneNumber: data.phoneNumber,
            // gender: data.gender === 1 ? true : false,
            // roleId: data.roleId,
        })
        return res.status(200).json({
            success: true,
            message: 'Create user successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Error from server create new user',
        })
    }
}

// Login

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || password)
        return res.status(400).json({ success: false, message: 'Missing email or password' })

    // let userData = {}

    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
            raw: true,
        })
        if (!user) return res.status(404).json({ success: false, message: 'Wrong username' })

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(404).json({ success: false, message: 'Wrong password' })

        if (user && validPassword) {
            const accessToken = jwt.sign(
                {
                    id: user.id,
                    // roleId: user.roleId
                },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: '30s' }
            )
            const refreshToken = jwt.sign(
                {
                    id: user.id,
                    // roleId: user.roleId
                },
                process.env.JWT_REFRESH_KEY,
                { expiresIn: '30d' }
            )
            delete user.password
            // userData.user = user
            return res.status(200).json({ accessToken, refreshToken, success: true })
        }
    } catch (error) {
        console.log('err', error)
    }
}

module.exports = {
    register,
    login,
}
