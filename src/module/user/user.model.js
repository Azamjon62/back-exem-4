import { PostgresModel } from '../../postgres/postgres.js'

export class UserModel {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }

    async userListRetrieve() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM users
        `)
        return data
    }

    async createCompanies(payload) {
        await this.#_postgres.fetch(`
            INSERT INTO companies(name) VALUES($1)
        `, payload.name)
    }


    async createComplexes(payload) {
        await this.#_postgres.fetch(`
            INSERT INTO complex(name, location, company_id) VALUES($1, $2, $3)
        `, payload.name, payload.location, payload.company_id)
    }

    async createRooms(payload) {
        await this.#_postgres.fetch(`
            INSERT INTO room(room_count, meter_square, meter_price, complex_id) VALUES($1, $2, $3, $4)
        `, payload.room_count, payload.meter_square, payload.meter_price, payload.complex_id)
    }


    async createBanks(payload) {
        await this.#_postgres.fetch(`
            INSERT INTO bank(name, credit_cost, starting_payment, bank_service, year_duration, room_id) VALUES($1, $2, $3, $4, $5, $6)
        `, payload.name, payload.credit_cost, payload.starting_payment, payload.bank_service, payload.year_duration, payload.room_id)
    }
}
