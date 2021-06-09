import { combineReducers } from "redux"
import {
  bookedDatesReducer,
  bookingCheckReducer,
  bookingDetailsReducer,
  bookingsReducer,
} from "./bookingReducers"
import {
  allAdminRoomsReducer,
  allRoomsReducer,
  checkReviewReducer,
  newReviewReducer,
  roomDetailsReducer,
} from "./roomReducers"
import {
  authReducer,
  forgotPasswordReducer,
  loadUserReducer,
  userReducer,
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
})

export default reducer
