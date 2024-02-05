import { Router } from 'express'
import AuthController from './auth.controller.js'

export const authRoutes = Router()
    .post('/sign-in', AuthController.signIn)
    .post('/sign-out', AuthController.signOut)
