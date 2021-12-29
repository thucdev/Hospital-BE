import express from 'express'
import Login from '../../controllers/AuthController/Login'

let router = express.Router()

const webRoute = (app) => {
    router.post('/v1/register', Login.Register)

    return app.use('/', router)
}

module.exports = webRoute
