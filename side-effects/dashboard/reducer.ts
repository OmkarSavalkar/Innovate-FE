import { createSlice } from "@reduxjs/toolkit";
import { getTechStacks } from "./action";

const dashboardSlice = createSlice({
  name: "dashboardCalls",
  initialState: {
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTechStacks.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(getTechStacks.rejected, (state: any, action: any) => {
      console.log(`Error in getTechStacks reducer`, action.payload);
      state.isError = true;
    });
  },
});

export default dashboardSlice.reducer;
