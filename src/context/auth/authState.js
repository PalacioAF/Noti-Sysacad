import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import {
  SUCCESSFUL_REGISTRATION,
  ERROR_LOG,
  GET_USER,
  LOGIN_SUCCESSFUL,
  LOGIN_ERROR,
  SIGN_OFF,
} from "../../types";
import axiosClient from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    message: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signUp = async (data) => {
    try {
      const response = await axiosClient.post("/api/users", data);
      dispatch({
        type: SUCCESSFUL_REGISTRATION,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_LOG,
        payload: alert,
      });
    }
  };

  const authenticatedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await axiosClient.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const logIn = async (datos) => {
    try {
      const response = await axiosClient.post("/api/auth", datos);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  const signOff = () => {
    dispatch({
      type: SIGN_OFF,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        signUp,
        authenticatedUser,
        logIn,
        signOff,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
