import axios from "../configs/axiosServices";
import { GET_CATEGORIES } from "./constants";

const getCategories = (recursive) => {
  return axios.get(`${GET_CATEGORIES}?recursive=${recursive} `);
};

export { getCategories };
