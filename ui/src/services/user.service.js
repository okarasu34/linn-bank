import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const register = (user) => {
  return axios.post(API_URL + "users/register", user);
};

const login = (ssn, password) => {
  console.log("API_URL",API_URL);

  return axios
    .post(API_URL + "users/login", {
      ssn,
      password,
    })
    .then((response) => {
      if (response.data.id_token) {
        localStorage.setItem("token", response.data.id_token);
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getUser = () => {
  return axios.get(API_URL + "users/auth", { headers: authHeader() });
};

const updateUserInfo = (user) => {
  return axios.put(API_URL + "users/auth", user, { headers: authHeader() });
};

const updateUserPassword = (password) => {
  return axios.put(API_URL + "users/auth/password", password, { headers: authHeader() });
};

export default {
  register,
  login,
  logout,
  getUser,
  updateUserInfo,
  updateUserPassword
};
