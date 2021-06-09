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

// export const newReviewReducer = (state = {}, action) => {
//   switch (action.type) {
//     case NEW_REVIEW_REQUEST:
//       return { loading: true }
//     case NEW_REVIEW_SUCCESS:
//       return { loading: false, success: action.payload }
//     case NEW_REVIEW_FAIL:
//       return { loading: false, error: action.payload }
//     case NEW_REVIEW_RESET:
//       return { success: false }
//     case CLEAR_ERRORS:
//       return { ...state, error: null }
//     default:
//       return state
//   }
// }
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
