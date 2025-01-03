import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
const authentication = async (req, res, next) => {
    console.log("req is comming for authentication")
    try {
        const { token } = req.body
        console.log(token)
        if (!token) {
            return res.status(404).json({
                message: "Unauthorized token or token is not provided",
                sucess: false
            })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY)

        if (!decodedToken) {
            return res.status(404).json({
                message: "token is not verfied",
                status: false
            })
        }
        console.log(decodedToken)
        req.id = decodedToken.userid
        next()

    } catch (error) {
        console.log("Error is Ocurr in Authorization")
    }
}

export default authentication