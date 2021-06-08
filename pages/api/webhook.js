import nc from "next-connect"
import connectDB from "../../config/connectDB"

import { webhookCheckout } from "../../controllers/paymentCont"

import onError from "../../middlewares/errors"

const handler = nc({ onError })

connectDB()

export const config = {
  api: {
    bodyParser: false,
  },
}

handler.post(webhookCheckout)

export default handler
