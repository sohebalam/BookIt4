import Booking from "../models/bookingModel";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Setting up cloudinary config

// export const newBooking = catchAsyncErrors(async (req, res) => {
//   const {
//     room,
//     checkInDate,
//     checkOutDate,
//     daysOfStay,
//     amountPaid,
//     paymentInfo,
//   } = req.body;

//   console.log(req.body, req.user);

//   const booking = await Booking.create({
//     user: req.user._id,
//     room,
//     checkInDate,
//     checkOutDate,
//     daysOfStay,
//     amountPaid,
//     paymentInfo,
//   });

//   res.status(200).json({ success: true, booking });
// });
export const newBooking = catchAsyncErrors(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body;

  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    booking,
  });
});
