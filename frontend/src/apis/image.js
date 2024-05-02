import axios from "../configs/axiosServices";
import {
  GET_ALBUMS,
  UPLOAD_IMAGE,
  AUTO_FILL,
  ENHANCE_IMAGE,
  MARK_IMAGE,
  GET_MARKS,
  DOWNLOAD,
  GET_TRASH,
  REMOVE,
  RESTORE,
  UPDATE_NOTE,
  DELETE,
  DELETE_TRASH,
  SEARCH,
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

const getTrash = () => {
  return axios.get(`${GET_TRASH}`);
};
const remove = (id) => {
  return axios.put(`${REMOVE}?id=${id}`);
};
const restore = (id) => {
  return axios.put(`${RESTORE}?id=${id}`);
};
const updateNote = (id, note) => {
  return axios.put(`${UPDATE_NOTE}?id=${id}&note=${note}`);
};
const deleteImage = (id) => {
  return axios.delete(`${DELETE}?id=${id}`);
};
const deleteTrash = () => {
  return axios.delete(`${DELETE_TRASH}`);
};
const searchImage = (phoneAddress) => {
  return axios.get(`${SEARCH}?phoneAddress=${phoneAddress}`);
};
export {
  getAlbums,
  uploadImage,
  autoFill,
  enhanceImage,
  markImage,
  getMarkImages,
  downloadImage,
  getTrash,
  remove,
  restore,
  updateNote,
  deleteImage,
  deleteTrash,
  searchImage,
};
