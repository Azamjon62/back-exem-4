import { PostgresModel } from '../../postgres/postgres.js'

export class ReservationHouse {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }

    async getAllCompanies() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM companies
        `)

        return data
    }

    async getAllComplexes() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM complex
        `)

        return data
    }


    async getAllRooms() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM room
        `)

        return data
    }

    async getAllBanks() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM bank
        `)

        return data
    }

    async getTotalResults(companies_id, complex_id, room_count, year_duration) {
        
        const data = await this.#_postgres.fetch(`
            SELECT 
                companies.name AS company_name, 
                complex.name AS complex_name,
                room.room_count AS room_count,
                room.meter_square AS meter_square,
                room.meter_price AS meter_price,
                bank.name AS bank_name,
                bank.credit_cost AS credit_cost,
                bank.starting_payment AS starting_payment,
                bank.bank_service AS bank_service,
                bank.year_duration AS year_duration,
                (room.meter_price * room.meter_square) AS total_room_price,
                ((room.meter_price * room.meter_square) / bank.year_duration / 12) AS payment_for_month
                
            FROM 
                companies
            FULL OUTER JOIN complex ON companies.id = complex.company_id
            FULL OUTER JOIN room ON complex.id = room.complex_id
            FULL OUTER JOIN bank ON room.id = bank.room_id
            WHERE
                companies.id = $1
                AND complex.company_id = $2
                AND room.complex_id = $3
                AND bank.year_duration = $4
        `, companies_id, complex_id, room_count, year_duration)

        return data
    }
}
    