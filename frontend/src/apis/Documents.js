import axios from "../configs/axiosServices";
import {
  GET_DOCUMENTS,
  GET_DOCUMENT_BY_ID,
  UPLOAD,
  FILE_UPLOAD_BY_USER,
} from "./constants";

const getDocumentList = () => {
  return axios.get(`${GET_DOCUMENTS}`);
};
const getMostViewedDocuments = () => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/mostViewedDocuments`);
};
const getMostDownloadedDocuments = () => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/mostDownloadedDocuments`);
};
const getRecentlyAddedDocuments = () => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/recentlyAddedDocuments`);
};
const searchDocuments = (keyword) => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/search?k=${keyword}`);
};

const getDocumentById = (id) => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/${id}`);
};
const getDocumentsByCategoryId = (categoryId) => {
  return axios.get(`${GET_DOCUMENT_BY_ID}/listByCategoryId/${categoryId}`);
};
const generateLinkDownload = (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios.get(`${GET_DOCUMENT_BY_ID}/generateLinkDownload/${id}`, config);
};
const upLoadDocuments = (data, token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(`${UPLOAD}`, data, config);
};

const getFileUploadByUser = (token) => {
  return axios.get(`${FILE_UPLOAD_BY_USER}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {
  getDocumentList,
  getDocumentById,
  getDocumentsByCategoryId,
  generateLinkDownload,
  upLoadDocuments,
  searchDocuments,
  getMostDownloadedDocuments,
  getMostViewedDocuments,
  getRecentlyAddedDocuments,
  getFileUploadByUser,
};
