//DOCUMENT
const GET_CATEGORIES = "/categories";
const GET_DOCUMENTS = "/documents";
const GET_DOCUMENT_BY_ID = "/document";
const GET_FILE_BY_ID = "/file";
const UPLOAD = "/document/upload";
const SEARCH_BY_KEY = "/document/search";
const FILE_UPLOAD_BY_USER = "/document/myUploadFiles/";
const MOST_DOWNLOAD_DOCS = "/document/mostDownloadedDocuments";
const MOST_VIEW_DOCS = "/document/mostViewedDocuments";
const RECENTLY_DOCS = "/document/recentlyAddedDocuments";

//USER
const USER_LOGIN = "/user/authorize";
const GET_USER_DATA = "/user";
const REFRESH_TOKEN = "/user/refreshToken";
const REGISTER = "/user/register";

//MANAGER
const FEEDBACK = "/manager/feedback";

export {
  GET_CATEGORIES,
  GET_DOCUMENTS,
  GET_DOCUMENT_BY_ID,
  GET_FILE_BY_ID,
  USER_LOGIN,
  GET_USER_DATA,
  REGISTER,
  UPLOAD,
  SEARCH_BY_KEY,
  FILE_UPLOAD_BY_USER,
  MOST_DOWNLOAD_DOCS,
  MOST_VIEW_DOCS,
  RECENTLY_DOCS,
  REFRESH_TOKEN,
};
