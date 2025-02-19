import { createChannel } from "../Controller/CreateChannel.controller.js"
import authentication from "../Middleware/Authentication.js"
import express from "express"

const router = express.Router()

router.route("/channel").post(authentication, createChannel);
export default router;