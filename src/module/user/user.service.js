import { UserModel } from './user.model.js'
import { format } from 'date-fns'
import { sign } from "../../helper/jwt.helper.js";

class UserService {
    #_userModel

    constructor() {
        this.#_userModel = new UserModel()
    }

    async userListRetrieve() {
        const userList = await this.#_userModel.userListRetrieve()

        return userList.map(user => {
            return {
                ...user,
                created_at: format(user.created_at, 'dd-MM-yyyy')
            }
        })
    }

    
    async createCompany(payload) {
        await this.#_userModel.createCompanies({
            name: payload.name
        })

        return null;
    }


    async createComplexes(payload) {
        await this.#_userModel.createComplexes({
            name: payload.name,
            location: payload.location,
            company_id: payload.company_id
        })

        return null
    }


    async createRooms(payload) {
        await this.#_userModel.createRooms({
            room_count: payload.room_count,
            meter_square: payload.meter_square,
            meter_price: payload.meter_price,
            complex_id: payload.complex_id
        })

        return null
    }


    async createBanks(payload) {
        await this.#_userModel.createBanks({
            name: payload.name,
            credit_cost: payload.credit_cost,
            starting_payment: payload.starting_payment,
            bank_service: payload.bank_service,
            year_duration: payload.year_duration,
            room_id: payload.room_id
        })

        return null
    }

}

export default new UserService()
