import express, { urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();

app.use(cors())
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

const port = process.env.PORT
app.listen(port, () => {
    console.log(`app is running on port no${port}`)
})

app.listen