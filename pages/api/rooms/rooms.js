import nc from "next-connect"
import { allRooms, newRoom } from "../../../controllers/roomControllers"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"

connectDB()

const handler = nc({ onError })

handler.get(allRooms)
handler.post(newRoom)

export default handler
