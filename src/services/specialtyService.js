import db from '../models'
// import specialtyTranslation from '../models/specialtyTranslation'
// import Specialty from '../models/specialty'

let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    success: false,
                    message: 'Missing input parameter!',
                })
            } else {
                await db.Specialty.create({
                    title: data.title,
                    img: data.img,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                })
                resolve({
                    success: true,
                    message: 'Oke',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createNewSpecialtyTranslation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    success: false,
                    message: 'Missing input parameter!',
                })
            } else {
                await db.specialty_translation.findOrCreate({
                    where: {
                        specialtyId: data.specialtyId,
                    },
                    defaults: {
                        specialtyId: data.specialtyId,
                        title: data.title,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown,
                        langCode: data.code,
                    },
                })
                resolve({
                    success: true,
                    message: 'Oke',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllSpecialties = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
                include: [
                    {
                        model: db.specialty_translation,
                        as: 'translationData',
                        attributes: [
                            'descriptionHTML',
                            'descriptionMarkdown',
                            'title',
                            'langCode',
                            'updatedAt',
                        ],
                    },
                ],
                nest: true,
                raw: true,
            })
            if (data && data.length > 0) {
                data.map((item) => {
                    item.img = Buffer.from(item.img, 'base64').toString('binary')
                })
            }

            resolve({
                success: true,
                data: data,
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getSpecialtyById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findOne({ where: { id: id } })
            if (data && data.length > 0) {
                // data.map((item) => {
                //     item.img = Buffer.from(item.img, 'base64').toString('binary')
                // })
                data.img = Buffer.from(data.img, 'base64').toString('binary')
            }
            resolve({
                success: true,
                data: data,
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewSpecialty,
    getAllSpecialties,
    getSpecialtyById,
    createNewSpecialtyTranslation,
}
