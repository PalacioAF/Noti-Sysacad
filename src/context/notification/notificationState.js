import React, { useReducer } from "react";
import notificationContext from "./notificationContext";
import notificationReducer from "./notificationReducer";
import {
  NOTIFICATIONS,
  ADD_NOTIFICATION,
  VALIDATE_NOTIFICATION,
  CLEAN,
} from "../../types";
import axiosClient from "../../config/axios";

const NotificationState = (props) => {
  const initialState = {
    notifications: [],
    errorNotification: false,
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const getNotifications = async () => {
    try {
      const res = await axiosClient.get("/api/notifications");
      dispatch({
        type: NOTIFICATIONS,
        payload: res.data.notifications,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNotification = async (notification) => {
    try {
      const res = await axiosClient.post("/api/notifications", notification);
      dispatch({
        type: ADD_NOTIFICATION,
        payload: res.data.notification,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const valitateNotification = () => {
    dispatch({
      type: VALIDATE_NOTIFICATION,
    });
  };

  const clean = () => {
    dispatch({
      type: CLEAN,
    });
  };

  return (
    <notificationContext.Provider
      value={{
        notifications: state.notifications,
        errorNotification: state.errorNotification,
        getNotifications,
        addNotification,
        valitateNotification,
        clean,
      }}
    >
      {props.children}
    </notificationContext.Provider>
  );
};

export default NotificationState;
