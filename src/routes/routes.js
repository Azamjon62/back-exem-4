import { Router } from 'express'
import { authRoutes } from '../module/auth/auth.routes.js'
import VerifyAccessMiddleware from '../middleware/verify-access.middleware.js'
import { userRoutes } from '../module/user/user.routes.js'
import { reservationHouseRoutes } from '../module/reservation-house/reservation-house.routes.js'

export const routes = Router()
    .use(authRoutes)
    .use(reservationHouseRoutes)
    .use('/*', VerifyAccessMiddleware.verify)
    .use(userRoutes)


