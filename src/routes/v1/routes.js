import express from 'express'
import Authentication from '../../controllers/AuthController/Authentication'
import userController from '../../controllers/UserController/userController'
import verifyToken from '../../controllers/AuthController/middleware/verifyToken'

let router = express.Router()

const webRoute = (app) => {
    router.post('/v1/register', Authentication.register)
    router.post('/v1/login', Authentication.login)

    router.get('/v1/user', verifyToken.verifyToken, userController.getAllUsers)
    // router.get('/v1/user', userController.getAllUsers)
    return app.use('/', router)
}

module.exports = webRoute
