import { ReservationHouse } from './reservation-house.model.js'

class ReservationHouseService {
    #_productModel

    constructor() {
        this.#_productModel = new ReservationHouse()
    }

    async retrieveCompaniesList() {
        const companiesList = await this.#_productModel.getAllCompanies()

        return companiesList.map(companies => {
            return {
                ...companies
            }
        })
    }

    async retrieveComplexesList() {
        const complexesList = await this.#_productModel.getAllComplexes()

        return complexesList.map(complexes => {
            return {
                ...complexes
            }
        })
    }

    async retrieveRoomsList() {
        const roomsList = await this.#_productModel.getAllRooms()

        return roomsList.map(room => {
            return {
                ...room
            }
        })
    }
    

    async retrieveBanksList() {
        const banksList = await this.#_productModel.getAllBanks()

        return banksList.map(bank => {
            return {
                ...bank
            }
        })
    }

    async retrieveCalculatorListById(payload) {
        const companyList = await this.#_productModel.getTotalResults(
            payload.companies_id,
            payload.complex_id,
            payload.room_count,
            payload.year_duration
        )
        return companyList;
    }

}

export default new ReservationHouseService()
