import { Contact, getContactForDmList } from "../Controller/Contact.controller.js";
import authentication from "../Middleware/Authentication.js";
import express from "express"

const router = express.Router();
router.route("/contact").post(authentication, Contact);
router.route("/getcontacts-for-dm").post(authentication, getContactForDmList)

export default router