import ReservationHouseService from './reservation-house.service.js'

class ReservationHouseController {
    async retrieveCompanyList(_, res) {
        res.json({
            data: await ReservationHouseService.retrieveCompaniesList()
        })
    }

    async retrieveComplexList(_, res) {
        res.json({
            data: await ReservationHouseService.retrieveComplexesList()
        })
    }

    async retrieveRoomList(_, res) {
        res.json({
            data: await ReservationHouseService.retrieveRoomsList()
        })
    }

    async retrieveBankList(_, res) {
        res.json({
            data: await ReservationHouseService.retrieveBanksList()
        })
    }

    async retrieveCalculatorListById(req, res) {
        const { companies_id, complex_id, room_count, year_duration } = req.body

        const company = await ReservationHouseService.retrieveCalculatorListById({
            companies_id,
            complex_id,
            room_count,
            year_duration
        })
        res.json({
            data: company
        });

    }

}

export default new ReservationHouseController()
