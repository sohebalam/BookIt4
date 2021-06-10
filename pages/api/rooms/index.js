import nc from "next-connect"
import connectDB from "../../../config/connectDB"

import { allRooms, newRoom } from "../../../controllers/roomControllers"

import onError from "../../../middlewares/errors"
import { isAuthenticatedUser, authoriseRoles } from "../../../middlewares/auth"

const handler = nc({ onError })

connectDB()

handler.get(allRooms)

handler.use(isAuthenticatedUser, authoriseRoles("admin")).post(newRoom)

export default handler
