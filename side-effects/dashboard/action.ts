import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/constant";

export const getTechStacks = createAsyncThunk(
  "getTechStacks",
  async (payload: any) => {
    const resp = await axios.post(`${url}/techstack`, payload);
    return resp.data;
  }
);
