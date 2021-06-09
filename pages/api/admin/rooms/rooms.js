import nc from "next-connect"

import connectDB from "../../../../config/connectDB"
import onError from "../../../../middlewares/errors"
import {
  authoriseRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth"
import { allAdminRooms } from "../../../../controllers/roomControllers"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser, authoriseRoles("admin")).get(allAdminRooms)

export default handler
