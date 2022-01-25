import specialtyService from '../../services/specialtyService'

let createNewSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createNewSpecialty(req.body)
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Error when trying to create new specialty',
        })
    }
}

let getAllSpecialties = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialties()
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            success: false,
            message: 'Error when trying to get all specialties',
        })
    }
}

module.exports = { createNewSpecialty, getAllSpecialties }
