import {
  ALL_ROOMS_FAIL,
  ALL_ROOMS_SUCCESS,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  NEW_REVIEW_REQUEST,
  REVIEW_AVAILABLE_REQUEST,
  REVIEW_AVAILABLE_SUCCESS,
  REVIEW_AVAILABLE_FAIL,
  ADMIN_ROOMS_REQUEST,
  ADMIN_ROOMS_FAIL,
  ADMIN_ROOMS_SUCCESS,
  NEW_ROOM_REQUEST,
  NEW_ROOM_SUCCESS,
  NEW_ROOM_FAIL,
  NEW_ROOM_RESET,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_SUCCESS,
  UPDATE_ROOM_FAIL,
  UPDATE_ROOM_RESET,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAIL,
  DELETE_ROOM_RESET,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
} from "../constants/roomTypes"

export const allRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ALL_ROOMS_SUCCESS:
      return {
        roomsCount: action.payload.roomsCount,
        resPerPage: action.payload.resPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
        rooms: action.payload.rooms,
      }
    case ALL_ROOMS_FAIL:
      return { error: action.payload }
    case CLEAR_ERRORS:
      return { ...state, error: null }

    default:
      return state
  }
}

export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_SUCCESS:
      return { room: action.payload }
    case ROOM_DETAILS_FAIL:
      return { error: action.payload }
    case CLEAR_ERRORS:
      return { ...state, error: null }

    default:
      return state
  }
}

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_REVIEW_REQUEST:
      return {
        loading: true,
      }

    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      }

    case NEW_REVIEW_RESET:
      return {
        success: false,
      }

    case NEW_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }

    default:
      return state
  }
}

export const checkReviewReducer = (
  state = { reviewAvailable: null },
  action
) => {
  switch (action.type) {
    case REVIEW_AVAILABLE_REQUEST:
      return { loading: true }
    case REVIEW_AVAILABLE_SUCCESS:
      return { loading: false, reviewAvailable: action.payload }
    case REVIEW_AVAILABLE_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const allAdminRoomsReducer = (state = { room: [] }, action) => {
  switch (action.type) {
    case ADMIN_ROOMS_REQUEST:
      return { loading: true }
    case ADMIN_ROOMS_SUCCESS:
      return { loading: false, rooms: action.payload }
    case ADMIN_ROOMS_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const newRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case NEW_ROOM_REQUEST:
      return { loading: true }
    case NEW_ROOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        room: action.payload.room,
      }
    case NEW_ROOM_FAIL:
      return { loading: false, error: action.payload }
    case NEW_ROOM_RESET:
      return { success: false }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const updateRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case UPDATE_ROOM_REQUEST:
      return { loading: true }
    case UPDATE_ROOM_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.success,
      }
    case UPDATE_ROOM_FAIL:
      return { loading: false, error: action.payload }
    case UPDATE_ROOM_RESET:
      return { isUpdated: false }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const deleteRoomReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case DELETE_ROOM_REQUEST:
      return { loading: true }
    case DELETE_ROOM_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload.success,
      }
    case DELETE_ROOM_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_ROOM_RESET:
      return { isDeleted: false }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const roomReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { loading: true }
    case GET_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload }
    case GET_REVIEWS_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

export const deleteReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true }
    case DELETE_REVIEW_SUCCESS:
      return { loading: false, isDeleted: action.payload }
    case DELETE_REVIEW_RESET:
      return { isDeleted: false }
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}
