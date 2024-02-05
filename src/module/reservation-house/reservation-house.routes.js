import { Router } from 'express'
import ReservationHouseController from './reservation-house.controller.js'

export const reservationHouseRoutes = Router()
    .get('/companies', ReservationHouseController.retrieveCompanyList)
    .get('/complexes', ReservationHouseController.retrieveComplexList)
    .get('/rooms', ReservationHouseController.retrieveRoomList)
    .get('/banks', ReservationHouseController.retrieveBankList)
    .get('/calculator', ReservationHouseController.retrieveCalculatorListById)
