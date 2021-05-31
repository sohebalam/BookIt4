import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import { currentUserProfile } from "../../../controllers/authControllers"
import { isAuthenticatedUser } from "../../../middlewares/auth"

import onError from "../../../middlewares/errors"

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).get(currentUserProfile)

export default handler
