import db from "../models"

let createDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data) {
                resolve({
                    success: false,
                    message: "Missing input parameter!",
                })
            } else {
                let isEmail = await db.User.findOne({
                    where: { email: data.email },
                })
                if (isEmail) {
                    resolve({
                        success: false,
                        message: "Email is already exist!",
                    })
                } else {
                    let data = await db.User.findOrCreate({
                        //  where: { email: data.email },
                    })
                }
                resolve({
                    success: true,
                    message: "Oke",
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createDoctor,
}
