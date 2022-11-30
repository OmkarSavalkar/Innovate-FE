import axios from "axios";
const url = `https://x-innovate-be.herokuapp.com`;

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
  // return axios.post(`http://localhost:3000/recoverPassword`, payload);
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
