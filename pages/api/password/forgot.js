import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import { forgotPassword } from "../../../controllers/authControllers"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

connectDB()

handler.post(forgotPassword)

export default handler
