import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getManager = createAsyncThunk("manager/getManager", async () => {
  const response = await axios.get(
    "https://x-innovate-be.herokuapp.com/manager/637f8562def56347b60c6b46"
  );
  return response.data;
});
