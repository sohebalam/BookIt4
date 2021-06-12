import nc from "next-connect"
import { checkRoomAvail } from "../../../controllers/bookingControllers"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"

connectDB()

const handler = nc({ onError })

handler.get(checkRoomAvail)

export default handler
