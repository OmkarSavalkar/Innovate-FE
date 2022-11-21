import axios from "axios";
const url = `https://x-innovate-be.herokuapp.com`;

export const postLoginData = (payload: Object) => {
  return axios.post(`${url}/login`, payload);
};

export const postVerifyEmail = (payload: Object) => {
  return axios.post(`${url}/recoverPassword`, payload);
  // return axios.post(`http://localhost:3000/recoverPassword`, payload);
};
