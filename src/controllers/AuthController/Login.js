import bcrypt from 'bcrypt'
import db from '../../models/index'

const Register = async (req, res) => {
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
        return res.status(500).json({
            success: true,
            message: 'Create user successfully',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            errMessage: 'Error from server create new user',
        })
    }
}

module.exports = {
    Register,
}
