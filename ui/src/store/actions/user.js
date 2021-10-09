import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,
  SET_MESSAGE,
} from "./types";

import UserService from "../../services/user.service";

export const registerUser = (user) => (dispatch) => {
  return UserService.register(user).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "User Created Successfully",
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (ssn, password) => (dispatch) => {
  return UserService.login(ssn, password).then(
    (data) => {
      UserService.getUser().then((user) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: user.data },
        });

        return Promise.resolve();
      });
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  UserService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const updateUser = (user) => (dispatch) => {
  return UserService.updateUserInfo(user).then(
    (response) => {
      dispatch({
        type: UPDATE_USER_INFO_SUCCESS,
        payload: user
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "User Updated Successfully",
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: UPDATE_USER_INFO_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
