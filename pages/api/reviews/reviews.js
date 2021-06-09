import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"
import { createRoomReview } from "../../../controllers/roomControllers"

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).put(createRoomReview)

export default handler
