import Room from "../models/roomModel"

import User from "../models/userModel"
import Booking from "../models/bookingModel"

import ErrorHandler from "../utils/errorHandler"
import catchAsyncErrors from "../middlewares/catchAsyncErrors"
import absoluteUrl from "next-absolute-url"
import getRawBody from "raw-body"

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

// export const webhookCheckout = catchAsyncErrors(async (req, res) => {
//   const rawBody = getRawBody(req)
//   try {
//     const signature = req.headers["stripe-signature"]
//     const event = stripe.webhook.constructEvent(
//       rawBody,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     )

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object
//       const room = session.client_reference_id
//       const user = (await User.findOne({ email: session.customer_email })).id

//       const amountPaid = session.amount_total / 100

//       const paymentInfo = {
//         id: session.payment_intent,
//         status: session.payment_status,
//       }

//       const checkInDate = session.metaData.checkInDate
//       const checkOutDate = session.metaData.checkOutDate
//       const daysOfStay = session.metaData.daysOfStay

//       const booking = await Booking.create({
//         room,
//         user,
//         checkInDate,
//         checkOutDate,
//         daysOfStay,
//         amountPaid,
//         paymentInfo,
//         paidAt: Date.now(),
//       })

//       res.status(200).json({
//         success: true,
//       })
//     }
//   } catch (error) {
//     console.log("Error in StripeCheckout Payment", error)
//   }
// })

export const webhookCheckout = catchAsyncErrors(async (req, res) => {
  const rawBody = await getRawBody(req)

  try {
    const signature = req.headers["stripe-signature"]

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const room = session.client_reference_id
      const user = (await User.findOne({ email: session.customer_email })).id

      const amountPaid = session.amount_total / 100

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      }

      const checkInDate = session.metadata.checkInDate
      const checkOutDate = session.metadata.checkOutDate
      const daysOfStay = session.metadata.daysOfStay

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      })

      res.status(200).json({ success: true })
    }
  } catch (error) {
    console.log("Error in Stripe Checkout Payment => ", error)
  }
})
