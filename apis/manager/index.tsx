import axios from "axios";
import { url } from "../../utils/constant";

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
