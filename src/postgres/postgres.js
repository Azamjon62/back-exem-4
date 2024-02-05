import pg from 'pg'


export class PostgresModel {
    #pg

    constructor() {
        this.#pg = new pg.Pool({
            host: process.env.DB_HOST ?? '127.0.0.1',
            port: process.env.DB_PORT ?? 5432,
            user: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '1002',
            database: process.env.DB_DATABASE ?? 'exem'
        })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect()
        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } catch(err) {
            console.log(err)
        } finally {
            client.release()
        }
    }
}
