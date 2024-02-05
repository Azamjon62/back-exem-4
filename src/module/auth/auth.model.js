import { PostgresModel } from '../../postgres/postgres.js'

export class AuthModel {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }

    async userRetrieve({ username, password, role }) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3
        `, username, password, role)

        return data
    }

    
    async createUserDevice({ deviceType, deviceModel, userAgent, accessToken, refreshToken, userId }) {
        await this.#_postgres.fetch(`
            INSERT INTO
                user_device(
                    device_type,
                    device_model,
                    user_agent,
                    access_token,
                    refresh_token,
                    user_id
                )
            VALUES($1, $2, $3, $4, $5, $6)
        `, deviceType, deviceModel, userAgent, accessToken, refreshToken, userId)
    }

    async retrieveUserDevice({ refreshToken }) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM user_device WHERE refresh_token = $1 AND deleted_at IS NULL
        `, refreshToken)

        return data
    }

    async updateUserDevice({ refreshToken }) {
        await this.#_postgres.fetch(`
            UPDATE
                user_device
            SET
                deleted_at = CURRENT_TIMESTAMP
            WHERE
                refresh_token = $1
        `, refreshToken)
    }
}
