import jwt from 'jsonwebtoken'

class VerifyAccessMiddleware {
    verify(req, res, next) {
        const { authorization } = req.headers

        if(!authorization) {
            return res.status(401).json({
                message: 'Provide authorization header'
            })
        }

        const accessToken = authorization.replace('Bearer ', '')

        jwt.verify(accessToken, process.env.SECRET_KEY, async(err, decoded) => {
            if(err instanceof jwt.TokenExpiredError) {
                res.status(401).json({
                    message: 'Token expired'
                })
                return
            }

            if(err instanceof jwt.JsonWebTokenError) {
                res.status(401).json({
                    message: 'Invalid token'
                })
                return
            }

            req.body.id = decoded.id
            next()
        })
    }
}

export default new VerifyAccessMiddleware()
