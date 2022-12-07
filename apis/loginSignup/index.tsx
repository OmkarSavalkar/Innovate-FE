import axios from "axios";
import { url } from "../../utils/constant";

export const postLoginData = (payload: Object) => {
  return axios.post(`${url}/login`, payload);
};

export const postVerifyEmail = (payload: Object) => {
  return axios.post(`${url}/recoverPassword`, payload);
};

export const postResetPasswordEmail = (
  urlResetToken: string,
  payload: Object
) => {
  return axios.post(`${url}/reset-Password/${urlResetToken}`, payload);
};

export const getManagerList = () => {
  return axios.get(`${url}/manager`);
};
export const getTechStackList = (payload: Object) => {
  return axios.post(`${url}/techstack`, payload);
};
export const postSignUpData = (payload: Object) => {
  return axios.post(`${url}/register`, payload);
};
