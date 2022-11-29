import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getManager = createAsyncThunk("manager/getManager", async () => {
  const response = await axios.get(
    `https://x-innovate-be.herokuapp.com/manager/${
      JSON.parse(sessionStorage.getItem("user") || "")?.id
    }`
  );
  return response.data;
});
