import axios from "axios"
import absoluteUrl from "next-absolute-url"
import {
  ADMIN_ROOMS_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_SUCCESS,
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  GET_REVIEWS_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  REVIEW_AVAILABLE_FAIL,
  REVIEW_AVAILABLE_REQUEST,
  REVIEW_AVAILABLE_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
} from "../constants/roomTypes"

export const getRooms =
  (req, currentPage = 1, location = "", guests, category) =>
  async (dispatch) => {
    try {
      const { origin } = absoluteUrl(req)

      let link = `${origin}/api/rooms/rooms?page=${currentPage}&location=${location}`

      if (guests) {
        link = link.concat(`&guestCapacity=${guests}`)
      }
      if (category) {
        link = link.concat(`&category=${category}`)
      }

      const { data } = await axios.get(link)
      dispatch({
        type: ALL_ROOMS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({ type: ALL_ROOMS_FAIL, payload: error.response.data.message })
    }
  }

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}

export const getRoomDetails = (req, id) => async (dispatch) => {
  const { origin } = absoluteUrl(req)

  let url = req

  if (req) {
    url = `${origin}/api/rooms/${id}`
  } else {
    url = `/api/rooms/${id}`
  }

  const { data } = await axios.get(url)
  try {
    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data.room })
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

export const newReviewAc = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(`/api/reviews/reviews`, reviewData, config)

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const checkReviewAvailability = (roomId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_AVAILABLE_REQUEST })

    const { data } = await axios.get(
      `/api/reviews/checkReviewAuth?roomId=${roomId}`
    )

    dispatch({
      type: REVIEW_AVAILABLE_SUCCESS,
      payload: data.isReviewAvailable,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_AVAILABLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const adminRooms = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ROOMS_REQUEST })

    const { data } = await axios.get(`/api/admin/rooms/rooms`)

    dispatch({
      type: ADMIN_ROOMS_SUCCESS,
      payload: data.rooms,
    })
  } catch (error) {
    dispatch({
      type: ADMIN_ROOMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const roomNew = (roomData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ROOM_REQUEST })

    const { data } = await axios.post(`/api/rooms`, roomData)

    dispatch({
      type: NEW_ROOM_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: NEW_ROOM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const roomUpdate = (id, roomData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ROOM_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

    dispatch({
      type: UPDATE_ROOM_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_ROOM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const roomDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROOM_REQUEST })

    const { data } = await axios.delete(`/api/rooms/${id}`)

    dispatch({
      type: DELETE_ROOM_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_ROOM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getRoomReviews = (id) => async (dispatch) => {
  // console.log(id)
  try {
    dispatch({ type: GET_REVIEWS_REQUEST })

    const { data } = await axios.get(`/api/reviews/reviews/?id=${id}`)

    dispatch({
      type: GET_REVIEWS_SUCCESS,
      payload: data.reviews,
    })
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const reviewDelete = (id, roomId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST })

    const { data } = await axios.delete(
      `/api/reviews/reviews/?id=${id}&roomId=${roomId}`
    )

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
