import nc from "next-connect"

import connectDB from "../../../../config/connectDB"
import onError from "../../../../middlewares/errors"
import {
  authoriseRoles,
  isAuthenticatedUser,
} from "../../../../middlewares/auth"
import {
  deleteUser,
  getUserDetails,
  updateUserDetails,
} from "../../../../controllers/authControllers"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser, authoriseRoles("admin")).get(getUserDetails)
handler.use(isAuthenticatedUser, authoriseRoles("admin")).put(updateUserDetails)
handler.use(isAuthenticatedUser, authoriseRoles("admin")).delete(deleteUser)

export default handler
