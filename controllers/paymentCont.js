import Room from "../models/roomModel"

import User from "../models/userModel"
import bookingModel from "../models/bookingModel"

import ErrorHandler from "../utils/errorHandler"
import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import absoluteUrl from "next-absolute-url"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Create all rooms   =>   /api/rooms
export const stripeCheckout = catchAsyncErrors(async (req, res) => {
  //   console.log(req.query.roomId)
  const room = await Room.findById(req.query.roomId)

  const { checkInDate, checkOutDate, daysOfStay } = req.query

  const { origin } = absoluteUrl(req)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${origin}/bookings/me`,
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "gbp",
        quantity: 1,
      },
    ],
  })
  res.status(200).json(session)
})
