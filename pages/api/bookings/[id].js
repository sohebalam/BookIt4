import nc from "next-connect"
import { getBookingDetails } from "../../../controllers/bookingCont"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser).get(getBookingDetails)

export default handler
