import axios from "../configs/axiosServices";
import { GET_ALBUMS, UPLOAD_IMAGE, AUTO_FILL } from "./constants";

const getAlbums = () => {
  return axios.get(`${GET_ALBUMS}`);
};
const uploadImage = (data) => {
  return axios.post(`${UPLOAD_IMAGE}`, data);
};
const autoFill = (phoneNumber) => {
  return axios.get(`${AUTO_FILL}?phoneNumber=${phoneNumber}`);
};
export { getAlbums, uploadImage, autoFill };
