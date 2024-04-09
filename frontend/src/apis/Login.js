import axios from "../configs/axiosServices";
import {
  USER_LOGIN,
  GET_USER_DATA,
  REGISTER,
  REFRESH_TOKEN,
} from "./constants";

const login = (data) => {
  return axios.post(`${USER_LOGIN}`, data);
};

const getUserData = (token) => {
  return axios.get(`${GET_USER_DATA}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const registerUser = (data) => {
  return axios.post(`${REGISTER}`, data);
};
const refreshToken = (token) => {
  return axios.get(`${REFRESH_TOKEN}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export { login, getUserData, registerUser, refreshToken };
