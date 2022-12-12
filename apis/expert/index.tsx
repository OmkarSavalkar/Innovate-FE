import axios from "axios";
import { url } from "../../utils/constant";

export const addExperties = (userId: any, payload: Object) => {
  return axios.post(`${url}/addExperties/${userId}`, payload);
};
