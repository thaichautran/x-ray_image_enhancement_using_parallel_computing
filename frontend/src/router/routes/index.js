import Home from "../../pages/HomePage/Home";
import NotFound from "../../pages/NotFoundPage/NotFound";

export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },

  //auth
  // {
  //   path: "/login",
  //   page: Login,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/register",
  //   page: Register,
  //   isShowHeader: false,
  // },
  // {
  //   path: "/forgotPassword",
  //   page: ForgotPassword,
  //   isShowHeader: false,
  // },
  //user
  // {
  //   path: "/user/uploaded",
  //   page: UserUploaded,
  //   isShowHeader: true,
  // },
  // {
  //   path: "/document/SearchDocumentsByName/:id",
  //   page: SearchDocumentsByName,
  //   isShowHeader: true,
  // },

  //other
  {
    path: "*",
    page: NotFound,
    isShowHeader: false,
  },
];
