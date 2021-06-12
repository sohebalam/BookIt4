import nc from "next-connect"
import { checkBookedDates } from "../../../controllers/bookingControllers"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"

connectDB()

const handler = nc({ onError })

handler.get(checkBookedDates)

export default handler
