import axios from "axios";
import { url } from "../../utils/constant";

export const getChat = (userId: any, techId: any) => {
  return axios.get(`${url}/getChat/${userId}/${techId}`);
};

export const postChat = (payload: any) => {
  return axios.post(`${url}/postChat`, payload);
};

export const getTechExpertUsers = (techObjectId: any, payload: any) => {
  return axios.post(`${url}/getTechExpertUsers/${techObjectId}`, payload);
};
