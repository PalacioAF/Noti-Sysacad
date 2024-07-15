import {
  NOTIFICATIONS,
  ADD_NOTIFICATION,
  VALIDATE_NOTIFICATION,
  CLEAN,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
        errorNotification: false,
      };
    case VALIDATE_NOTIFICATION:
      return {
        ...state,
        errorNotification: true,
      };
    case CLEAN:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};
