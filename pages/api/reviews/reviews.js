import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"
import {
  createRoomReview,
  deleteReview,
  getRoomReviews,
} from "../../../controllers/roomControllers"

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser).put(createRoomReview)
handler.use(isAuthenticatedUser).get(getRoomReviews)
handler.use(isAuthenticatedUser).delete(deleteReview)

export default handler
