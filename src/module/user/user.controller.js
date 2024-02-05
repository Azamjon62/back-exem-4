import UserService from './user.service.js'

class UserController {

    async userListRetrieve(_, res) {
        res.json({
            data: await UserService.userListRetrieve()
        })
    }

    async companyCreate(req, res) {
        await UserService.createCompany(req.body)
        res.sendStatus(204)
    }


    async complexCreate(req, res) {
        await UserService.createComplexes(req.body)
        res.sendStatus(204)
    }


    async roomCreate(req, res) {
        await UserService.createRooms(req.body)
        res.sendStatus(204)
    }


    async bankCreate(req, res) {
        await UserService.createBanks(req.body)
        res.sendStatus(204)
    }

}

export default new UserController()
