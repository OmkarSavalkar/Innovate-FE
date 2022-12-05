import axios from "axios";
const url = `https://x-innovate-be.herokuapp.com`;

export const approveExperts = (
  managerId: any,
  expertEmail: String,
  payload: Object
) => {
  return axios.put(
    `${url}/updateUserApproval/${managerId}/${expertEmail}`,
    payload
  );
};
