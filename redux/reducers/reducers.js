import { combineReducers } from "redux"
import {
  bookedDatesReducer,
  bookingCheckReducer,
  bookingsReducer,
} from "./bookingReducers"
import { allRoomsReducer, roomDetailsReducer } from "./roomReducers"
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
})

export default reducer
