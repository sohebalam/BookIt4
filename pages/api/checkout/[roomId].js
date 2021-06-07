import nc from "next-connect"
import { stripeCheckout } from "../../../controllers/paymentCont"
import connectDB from "../../../config/connectDB"
import onError from "../../../middlewares/errors"
import { isAuthenticatedUser } from "../../../middlewares/auth"

connectDB()

const handler = nc({ onError })

handler.use(isAuthenticatedUser).get(stripeCheckout)

export default handler
