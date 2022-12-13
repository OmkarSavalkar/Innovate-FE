import axios from "axios";
import { url } from "../../utils/constant";

export const getTechStackById = (_id: any) => {
  return axios.get(`${url}/findTechStackId/${_id}`);
};
export const getTrendingTech = () => {
  return axios.get(`${url}/trendingChat`);
};
