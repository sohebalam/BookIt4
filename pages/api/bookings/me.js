import nc from "next-connect"
import { myBookings } from "../../../controllers/bookingCont"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser).get(myBookings)

export default handler
