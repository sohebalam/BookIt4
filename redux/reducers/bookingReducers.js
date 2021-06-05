import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
} from "../constants/bookingTypes"

export const bookingCheckReducer = (
  state = { loading: false, available: null },
  action
) => {
  switch (action.type) {
    case CHECK_BOOKING_REQUEST:
      return { loading: true }
    case CHECK_BOOKING_SUCCESS:
      return { loading: false, available: action.payload }
    case CHECK_BOOKING_SUCCESS:
      return { loading: false, available: null }
    case CHECK_BOOKING_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bookedDatesReducer = (state = { dates: [] }, action) => {
  switch (action.type) {
    case BOOKED_DATES_SUCCESS:
      return { loading: false, dates: action.payload }
    case BOOKED_DATES_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
