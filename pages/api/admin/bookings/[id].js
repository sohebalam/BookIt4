import nc from "next-connect"
import connectDB from "../../../../config/connectDB"

import onError from "../../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../../middlewares/auth"
import { authoriseRoles } from "../../../../middlewares/auth"
import { deleteBookings } from "../../../../controllers/bookingCont"

const handler = nc({ onError })

connectDB()

handler.use(isAuthenticatedUser, authoriseRoles("admin")).delete(deleteBookings)

export default handler
