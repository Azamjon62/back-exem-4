import { Router } from 'express'
import UserController from './user.controller.js'

export const userRoutes = Router()
    .get('/users', UserController.userListRetrieve)
    .post('/company', UserController.companyCreate)
    .post('/complex', UserController.complexCreate)
    .post('/room', UserController.roomCreate)
    .post('/bank', UserController.bankCreate)

