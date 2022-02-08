import db from '../../models'

const getAllUsers = async (req, res) => {
    try {
        const allUser = await db.User.findAll({ raw: true })
        console.log('alluser', allUser)
        return res.status(200).json({ allUser })
    } catch (error) {
        console.log('', error)
    }
}

module.exports = { getAllUsers }
