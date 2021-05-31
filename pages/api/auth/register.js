import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import { registerUser } from "../../../controllers/authControllers"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

connectDB()

handler.post(registerUser)

export default handler
