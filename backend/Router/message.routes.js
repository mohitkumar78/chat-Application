import express from "express"
import { getAllmessage } from "../Controller/Messages.controller.js"
import authentication from "../Middleware/Authentication.js"
const Router = express.Router()

Router.route("/getAllmessage").post(authentication, getAllmessage);

export default Router;