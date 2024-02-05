import { AuthModel } from './auth.model.js'
import { sign } from '../../helper/jwt.helper.js'

class UserService {
    #_authModel

    constructor() {
        this.#_authModel = new AuthModel()
    }

    async signIn(payload) {
        const user = await this.#_checkUser({
            username: payload.username,
            password: payload.password,
            role: payload.role
        })
        

        if (user.role !== 'admin') {
            throw new Error('this user is not an admin')
        }

        const accessToken = sign({ id: user.id })
        const refreshToken = sign({ id: user.id }, 3000)

        await this.#_authModel.createUserDevice({ ...payload, userId: user.id, accessToken, refreshToken })

        return {
            accessToken,
            refreshToken
        }
    }

    async signOut(payload) {
        const [ checkRefreshToken ] = await this.#_authModel.retrieveUserDevice({
            refreshToken: payload.refreshToken
        })

        if(!checkRefreshToken) {
            throw new Error('Token already invalidated')
        }

        await this.#_authModel.updateUserDevice({
            refreshToken: payload.refreshToken
        })

        return null
    }

    async #_checkUser(payload) {
        const [ user ] = await this.#_authModel.userRetrieve({
            username: payload.username,
            password: payload.password,
            role: payload.role
        })


        if (!user) {
            throw new Error('Not Found')
        }

        return user
    }
}

export default new UserService()
