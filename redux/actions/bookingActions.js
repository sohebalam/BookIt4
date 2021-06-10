import {
  BOOKED_DATES_FAIL,
  BOOKED_DATES_SUCCESS,
  CHECK_BOOKING_FAIL,
  CHECK_BOOKING_REQUEST,
  CHECK_BOOKING_SUCCESS,
  MY_BOOKINGS_FAIL,
  MY_BOOKINGS_SUCCESS,
  CLEAR_ERRORS,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
} from "../constants/bookingTypes"

import absoluteUrl from "next-absolute-url"

import axios from "axios"
import {
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
} from "../constants/roomTypes"

export const checkBooking =
  (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {
      dispatch({ type: CHECK_BOOKING_REQUEST })

      // let link = `/api/bookings/check?roomId${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
      const { data } = await axios.get(link)

      dispatch({
        type: CHECK_BOOKING_SUCCESS,
        payload: data.isAvailable,
      })
    } catch (error) {
      dispatch({
        type: CHECK_BOOKING_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const getBookedDates = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/bookings/checkBookedDates?roomId=${id}`
    )

    dispatch({
      type: BOOKED_DATES_SUCCESS,
      payload: data.bookedDates,
    })
  } catch (error) {
    dispatch({
      type: BOOKED_DATES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const myBookings = (authCookie, req) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)
    const config = {
      headers: {
        cookie: authCookie,
      },
    }
    const { data } = await axios.get(`${origin}/api/bookings/me`, config)

    dispatch({
      type: MY_BOOKINGS_SUCCESS,
      payload: data.bookings,
    })
  } catch (error) {
    dispatch({
      type: MY_BOOKINGS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const bookingDetails = (authCookie, req, id) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req)
    const config = {
      headers: {
        cookie: authCookie,
      },
    }
    const { data } = await axios.get(`${origin}/api/bookings/${id}`, config)

    // console.log(data.booking)

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.booking,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
