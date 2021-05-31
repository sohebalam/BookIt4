import nc from "next-connect"
import { updateProfile } from "../../../controllers/authControllers"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser).put(updateProfile)

export default handler
