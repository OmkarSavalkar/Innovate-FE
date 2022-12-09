import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getManager } from "./action";

interface ManagerState {
  data: any;
  loading: String;
  error: String;
}
const initialState: ManagerState = {
  data: {},
  loading: "idle",
  error: "",
};
export const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getManager.pending, (state, action) => {
      if (state.loading === "idle") {
        state.loading = "pending";
      }
    });
    builder.addCase(getManager.fulfilled, (state, action) => {
      if (state.loading === "pending") {
        state.data = action.payload;
        state.loading = "idle";
      }
    });
    builder.addCase(getManager.rejected, (state, action) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.error = "Error occured";
      }
    });
  },
});
export default managerSlice.reducer;
