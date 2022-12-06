import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/constant";

export const getManager = createAsyncThunk("manager/getManager", async () => {
  const response = await axios.get(
    `${url}/manager/${JSON.parse(sessionStorage.getItem("user") || "")?._id}`
  );
  return response.data;
});
