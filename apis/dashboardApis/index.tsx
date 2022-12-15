import axios from "axios";
import { url } from "../../utils/constant";
const urlhost = `https://x-innovate-be.herokuapp.com`;

//user and expert will request to manager to add technology stack
export const postRequestAddStack = (payload: any) => {
  return axios.post(`${url}/requestAddStack`, payload);
};

//manager will add stack
export const postAddStack = (payload: any) => {
  return axios.post(`${url}/addStack`, payload);
};

//getting news feed
export const getNews = (newsCategory: string) => {
  return axios.get(
    `https://newsapi.org/v2/top-headlines?language=en&category=${newsCategory}&sortBy=popularity&sortBy=relevancy&sortBy=publishedAt&pageSize=50&apiKey=21f7690357db4456b30f9bf04a2f987e`
  );
};

export const getAllRolesCount = () => {
  return axios.get(`${url}/allRolesCount`);
};
