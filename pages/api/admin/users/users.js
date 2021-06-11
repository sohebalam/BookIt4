import nc from "next-connect"

import connectDB from "../../../../config/connectDB"
import onError from "../../../../middlewares/errors"
import {
  authoriseRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth"
import { allAdminUsers } from "../../../../controllers/authControllers"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser, authoriseRoles("admin")).get(allAdminUsers)

export default handler
