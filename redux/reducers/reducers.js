import { combineReducers } from "redux"
import {
  adminBookingsReducer,
  bookedDatesReducer,
  bookingCheckReducer,
  bookingDetailsReducer,
  bookingsReducer,
  deleteBookingReducer,
} from "./bookingReducers"
import {
  allAdminRoomsReducer,
  allRoomsReducer,
  checkReviewReducer,
  deleteRoomReducer,
  newReviewReducer,
  newRoomReducer,
  roomDetailsReducer,
  updateRoomReducer,
} from "./roomReducers"
import {
  allUsersReducer,
  authReducer,
  forgotPasswordReducer,
  loadUserReducer,
  userReducer,
  updateUserReducer,
  userDetailsReducer,
} from "./userReducers"

const reducer = combineReducers({
  allRooms: allRoomsReducer,
  roomDetails: roomDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  loadUser: loadUserReducer,
  bookingCheck: bookingCheckReducer,
  bookedDates: bookedDatesReducer,
  bookings: bookingsReducer,
  bookingDetails: bookingDetailsReducer,
  newReview: newReviewReducer,
  checkReview: checkReviewReducer,
  allAdminRooms: allAdminRoomsReducer,
  newRoom: newRoomReducer,
  updateRoom: updateRoomReducer,
  deleteRoom: deleteRoomReducer,
  adminBookings: adminBookingsReducer,
  deleteBooking: deleteBookingReducer,
  allUsers: allUsersReducer,
  updateUser: updateUserReducer,
  userDetails: userDetailsReducer,
})

export default reducer
