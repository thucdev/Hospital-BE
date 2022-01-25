import express from 'express'
import Authentication from '../../controllers/AuthController/Authentication'
import specialtyController from '../../controllers/DoctorController/specialtyController'
import userController from '../../controllers/UserController/userController'
import verifyToken from '../../controllers/AuthController/middleware/verifyToken'
import checkRole from '../../controllers/AuthController/middleware/checkRole'

let router = express.Router()

const webRoute = (app) => {
    router.post('/v1/api/register', Authentication.register)
    router.post('/v1/api/login', Authentication.login)
    router.post('/v1/api/logout', verifyToken, Authentication.logout)
    router.get('/v1/api/auth', verifyToken, Authentication.checkUserIsLogin)

    //refresh token
    router.post('/v1/api/refresh', Authentication.requestRefreshToken)

    router.post(
        '/v1/api/create-new-specialty',
        verifyToken,
        checkRole.checkAdmin,
        specialtyController.createNewSpecialty
    )
    router.get(
        '/v1/api/get-all-specialties',
        // verifyToken,
        specialtyController.getAllSpecialties
    )
    //router.get('/v1/api/user', verifyToken, userController.getAllUsers)
    // router.get('/v1/user', userController.getAllUsers)

    return app.use('/', router)
}

module.exports = webRoute
