import ImageByAlbum from "../../components/Albums/ImageByAlbum";
import ImageView from "../../components/Images/ImageView";
import Careful from "../../pages/HomePage/Careful";
import Home from "../../pages/HomePage/Home";
import SearchList from "../../pages/HomePage/SearchList";
import Trash from "../../pages/HomePage/Trash";
import NotFound from "../../pages/NotFoundPage/NotFound";

export const routes = [
  {
    path: "/",
    page: Home,
    isShowHeader: true,
  },

  //auth
  {
    path: "/album/:name",
    page: ImageByAlbum,
    isShowHeader: true,
  },
  {
    path: "/careful",
    page: Careful,
    isShowHeader: true,
  },
  {
    path: "/trash",
    page: Trash,
    isShowHeader: true,
  },
  {
    path: "/search/:name",
    page: SearchList,
    isShowHeader: true,
  },
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
