import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://x-innovate-be.herokuapp.com";

export const getTechStacks = createAsyncThunk(
  "getTechStacks",
  async (payload: any) => {
    const resp = await axios.post(`${url}/techstack`, payload);
    return resp.data;
  }
);
