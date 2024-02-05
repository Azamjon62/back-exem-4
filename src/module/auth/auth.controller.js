import AuthService from './auth.service.js'

class AuthController {
    async signIn(req, res) {
        const { username, password, role } = req.body

        const serviceResponse = await AuthService.signIn({
            username,
            password,
            role,
        })

        res.status(200).json({
            data: serviceResponse
        })
    }

    async signOut(req, res) {
        const { refreshtoken } = req.headers

        await AuthService.signOut({
            refreshToken: refreshtoken
        })

        res.sendStatus(204)
    }
}

export default new AuthController()
