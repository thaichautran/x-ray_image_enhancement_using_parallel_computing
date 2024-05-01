import axios from "../configs/axiosServices";
import {
  GET_ALBUMS,
  UPLOAD_IMAGE,
  AUTO_FILL,
  ENHANCE_IMAGE,
  MARK_IMAGE,
  GET_MARKS,
  DOWNLOAD,
} from "./constants";

const getAlbums = () => {
  return axios.get(`${GET_ALBUMS}`);
};
const uploadImage = (data) => {
  return axios.post(`${UPLOAD_IMAGE}`, data);
};
const autoFill = (phoneNumber) => {
  return axios.get(`${AUTO_FILL}?phoneNumber=${phoneNumber}`);
};
const enhanceImage = (data) => {
  return axios.post(`${ENHANCE_IMAGE}`, data);
};
const markImage = (id, status) => {
  return axios.put(`${MARK_IMAGE}?id=${id}&status=${status}`);
};
const getMarkImages = () => {
  return axios.get(`${GET_MARKS}?status=true`);
};
const downloadImage = (base64String) => {
  return axios.post(`${DOWNLOAD}`, base64String);
};
export {
  getAlbums,
  uploadImage,
  autoFill,
  enhanceImage,
  markImage,
  getMarkImages,
  downloadImage,
};
