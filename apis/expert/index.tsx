import axios from "axios";
import { url } from "../../utils/constant";

export const addExperties = (userId: any, payload: Object) => {
  return axios.post(`${url}/addExperties/${userId}`, payload);
};
export const appreciateExpert = (expertId: any) => {
  return axios.put(`${url}/appreciateExpert/${expertId}`);
};
export const setAvailability = (expertId: any, status: any) => {
  return axios.put(`${url}/expertAvailablity/${expertId}/${status}`);
};
export const getExpert = (expertId: any) => {
  return axios.get(`${url}/getExpert/${expertId}`);
};

export const getExpertLeaderBoardList = () => {
  return axios.get(`${url}/leaderboardExperts`);
};
